/*=========================================================================
Set darkmode via OS or local storage
=========================================================================*/
document.addEventListener('DOMContentLoaded',() => {
    if (
        localStorage.getItem('color-mode') === 'dark' || (window.matchMedia('(prefers-color-scheme: dark)').matches &&
            !localStorage.getItem('color-mode'))
        ) {
        document.documentElement.setAttribute("color-mode", "dark");
        document.getElementById("dark-toggle").checked = true;
        }
});


/*=========================================================================
Darkmode Toggle
=========================================================================*/
var toggle = document.getElementById("dark-toggle");
toggle.addEventListener("click", function () {
    if (toggle.checked ) {
        document.documentElement.setAttribute("color-mode", "dark");
        localStorage.setItem("color-mode", "dark");
    } else if (!toggle.checked) {
        document.documentElement.setAttribute("color-mode", "light");
        localStorage.setItem("color-mode", "light");
    }
});

/*=========================================================================
JavaScript Scroll to Anchor
@ https://perishablepress.com/vanilla-javascript-scroll-anchor/
=========================================================================*/

(function() {
	scrollTo();
})();

function scrollTo() {
	const links = document.querySelectorAll('.scroll');
	links.forEach(each => (each.onclick = scrollAnchors));
}

function scrollAnchors(e, respond = null) {
    if (window.matchMedia("(max-width: 768px)").matches) { // If on medium or lower device
	    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top - 25);
        e.preventDefault();
        var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
        const targetAnchor = document.querySelector(targetID);
        if (!targetAnchor) return;
        const originalTop = distanceToTop(targetAnchor);
        window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
        const checkIfDone = setInterval(function() {
            // const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
            if (distanceToTop(targetAnchor) === 0) {
                targetAnchor.tabIndex = '-1';
                targetAnchor.focus();
                window.history.pushState('', '', targetID);
                clearInterval(checkIfDone);
            }
        }, 100);
    } else {
        const distanceToTop = el => Math.floor(el.getBoundingClientRect().top - 49);
        e.preventDefault();
        var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
        const targetAnchor = document.querySelector(targetID);
        if (!targetAnchor) return;
        const originalTop = distanceToTop(targetAnchor);
        window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
        const checkIfDone = setInterval(function() {
            // const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
            if (distanceToTop(targetAnchor) === 0) {
                targetAnchor.tabIndex = '-1';
                targetAnchor.focus();
                window.history.pushState('', '', targetID);
                clearInterval(checkIfDone);
            }
        }, 100);
    }

}

/*=========================================================================
Show scroll to top btn when scrolled
=========================================================================*/
//Get the button:
scrollToTopBtn = document.querySelector('.return-to-top');
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

/*=========================================================================
Fixing BS Scrollspy
=========================================================================*/
function hotfixScrollSpy() {
    var dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'))
    let curScroll = getCurrentScroll();
    dataSpyList.forEach(function (dataSpyEl) {
        let offsets = bootstrap.ScrollSpy.getInstance(dataSpyEl)['_offsets'];
        for(let i = 0; i < offsets.length; i++){
            offsets[i] += curScroll;
        }
    })
}

function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

window.onload = function () {
    hotfixScrollSpy();
    window.scrollBy(0, .1);
}

window.addEventListener('resize', function(event) {
    const dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'));
    dataSpyList.forEach(function(dataSpyEl) {
      bootstrap.ScrollSpy.getInstance(dataSpyEl).refresh();
    });
    hotfixScrollSpy();
    window.scrollBy(0, .1);
}, true);

/*=========================================================================
Toggle menu on mobile
=========================================================================*/
var menuToggler = document.querySelector('.navbar-toggler');
var sideNav = document.getElementById('sideNav');
var mobileNav = document.querySelector('.mobile-nav');
var mainContent = document.querySelector('.main-content');
var closeBtn = document.querySelector('.close[aria-controls="sideNav"]')

// Show side nav on menu click
menuToggler.addEventListener('click', event => {
    sideNav.classList.toggle('show');
    mobileNav.classList.toggle('push');
    mainContent.classList.toggle('push');
});

// Hide side nav on menu close click
closeBtn.addEventListener('click', event => {
    sideNav.classList.remove('show');
    mobileNav.classList.remove('push');
    mainContent.classList.remove('push');
});

// Hide side nav on main content click
mainContent.addEventListener('click', event => {
    sideNav.classList.remove('show');
    mobileNav.classList.remove('push');
    mainContent.classList.remove('push');
});
