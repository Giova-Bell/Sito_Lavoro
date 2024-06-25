// makes the ingredients list scroll orizontally on mouse hover
// and removes the event if the @media query takes effect
function scrollHorizontally(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    this.scrollLeft -= (delta * 60); // Multiplied by 60
    e.preventDefault();
}

function addScrollEvents(element) {
    function add() {
        // add event on mouse scroll to scroll left
        if (element.addEventListener) {
            // IE9, Chrome, Safari, Opera
            element.addEventListener('mousewheel', scrollHorizontally, false);
            // Firefox
            element.addEventListener('DOMMouseScroll', scrollHorizontally, false);
        } else {
            // IE 6/7/8
            element.attachEvent('onmousewheel', scrollHorizontally);
        }

        // auto scroll
        // autoScroll(item)()
        // TODO: auto scroll should stop when
        // scrolling with mouse wheel
    }

    function remove() {
        if(element.removeEventListener) {
            element.removeEventListener('mousewheel', scrollHorizontally, false);
            element.removeEventListener('DOMMouseScroll', scrollHorizontally, false);
        }
    }

    return { add: add, remove: remove }
}

function checkMediaOnElement(fn) {
    function checkMedia(media) {
        if (!media.matches) {
            fn.add()
        } else {
            fn.remove()
        }
    }

    return checkMedia
}

function arrowClick(direction) {
    let item = document.getElementById('ingredients');
    let scrollSize = item.children[0].getBoundingClientRect().width;

    if (direction === 'left') { item.scrollLeft += scrollSize }
    if (direction === 'right') { item.scrollLeft -= scrollSize }
}

function autoScroll(element) {
    let isScrolled = false;

    function _wrapper() {
        let scrollSize = element.children[0].getBoundingClientRect().width;

        if (element.offsetWidth + element.scrollLeft >= element.scrollWidth) {
            isScrolled = true;
        } else if(element.scrollLeft == 0) {
            isScrolled = false;
        }
        
        if (isScrolled) { element.scrollLeft -= scrollSize }
        else { element.scrollLeft += scrollSize }


        setTimeout(() => {
            _wrapper()
        }, 2000)
    }

    return _wrapper
}

function main() {
    let item = document.getElementById('ingredients');
    let m = window.matchMedia('screen and (max-width: 26cm)');
    let checkMedia = checkMediaOnElement(addScrollEvents(item));
    
    checkMedia(m); // Call listener function at run time
    m.addEventListener('change', checkMedia); // Attach listener function on state changes
}

main()