from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.

class Project(models.Model): 
    name = models.CharField(max_length=64)
    description = models.TextField()
    active = models.BooleanField(default=True)
    link = models.URLField(blank=True)
    order = models.IntegerField(default=1)

    objects = models.Manager()

    def __str__(self):
        if self.active:
            return f'{self.name} (active)'
        return f'{self.name} (inactive)'

    def ordered_images(self):
        return self.images.order_by('order')

class ProjectImage(models.Model):
    def get_path(self, filename):
        return self.project.name + '\\' + filename

    # image = models.ImageField(upload_to=get_path)
    image = CloudinaryField('image')
    description = models.TextField(null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    order = models.IntegerField(default=1)
