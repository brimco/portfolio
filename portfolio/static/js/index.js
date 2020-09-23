// sizes in 'em'
let maxFontSize = 3
let minFontSize = 1
let changeFont = 0.0025
let hiFontRatio = 0.5

// heights in 'vh'
let maxHeight = 100
let minHeight = 14
let changeHeight = maxHeight / maxFontSize * changeFont

function start() {
    // mobile settings
    if (window.matchMedia("only screen and (max-width: 760px)").matches) {
        maxFontSize = 2.75
        minHeight = 10
        document.querySelector('#spacer').style.height = '150vh'
    }

    // get elements
    const logo = document.querySelector('#header-logo') 
    const header = document.querySelector('nav')
    const hi = document.querySelector('#hi')

    // set initial opacity and height
    hi.style.opacity = '100%'
    hi.style.height = '1em'

    // set initial height of header
    header.style.height = maxHeight + 'vh'
    
    // set initial font size
    logo.style.fontSize = maxFontSize + 'em'
    hi.style.fontSize = maxFontSize * hiFontRatio + 'em'

    // set scroll to change size, header height
    window.addEventListener('scroll', function(){
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
        }
        else if (percentProgress > endFade) {
            hi.style.opacity = (percentProgress - endFade) / (startFade - endFade)
            hi.style.height = '1em'
        }
        else {
            hi.style.opacity = '0%'
            hi.style.height = percentProgress + 'em'
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