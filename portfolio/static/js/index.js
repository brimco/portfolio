// sizes in 'em'
let maxFontSize = 3
let minFontSize = 1
let changeFont = 0.0025
let hiFontRatio = 0.5

// heights in 'vh'
let maxHeight = 100
let minHeight = 8
let changeHeight = maxHeight / maxFontSize * changeFont

function start() {
    // get elements
    const logo = document.querySelector('#header-logo') 
    const header = document.querySelector('nav')
    const hi = document.querySelector('#hi')

    // mobile settings
    if (window.matchMedia("only screen and (max-width: 760px)").matches) {
        maxFontSize = 2.4
        minHeight = 10
        document.querySelector('#spacer').style.height = '150vh'
        header_left.style.marginRight = '1em'
        header_right.style.marginLeft = '1em'
    }

    // set initial opacity and height
    hi.style.opacity = 1
    hi.style.height = '1em'
    header_right.style.opacity = 0
    header_left.style.opacity = 0

    // set initial height of header
    header.style.height = maxHeight + 'vh'
    
    // set initial font size
    logo.style.fontSize = maxFontSize + 'em'
    hi.style.fontSize = maxFontSize * hiFontRatio + 'em'

    // set scroll to change size, header height
    window.addEventListener('scroll', function(){
        console.log('scroll');
        // set font size
        let fontSize = Math.max(minFontSize, maxFontSize - (window.scrollY * changeFont))
        logo.style.fontSize = fontSize + 'em'

        // set height
        let height = Math.max(minHeight, maxHeight - (window.scrollY * changeHeight))
        header.style.height = height + 'vh'
        logo.style.height = height + 'vh'

        // fade hi opacity from 75 to 25, then shrink height to 0
        const startFade = 0.75
        const endFade = 0.15
        const percentProgress = (height - minHeight) / (maxHeight - minHeight)
        hi.style.fontSize = fontSize * hiFontRatio + 'em'
        if (percentProgress > startFade) {
            hi.style.opacity = 1
            header_left.style.opacity = 0
            header_right.style.opacity = 0
        }
        else if (percentProgress > endFade) {
            let opactiy = (percentProgress - endFade) / (startFade - endFade)
            hi.style.opacity = opactiy
            hi.style.height = '1em'
            header_right.style.opacity = 1 - opactiy
            header_left.style.opacity = 1 - opactiy
        }
        else {
            hi.style.opacity = 0
            hi.style.height = percentProgress + 'em'
            header_right.style.opacity = 1
            header_right.style.opacity = 1
        }
    });
}

// start when page loaded and ready
if( document.readyState !== 'loading' ) {
    start();
    
} else {
    document.addEventListener('DOMContentLoaded', function () {
        start();
    })
}