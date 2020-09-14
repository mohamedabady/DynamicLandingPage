/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navMenuList = document.querySelector('#navbar__list');
const pageSections = document.getElementsByTagName('section');
const topBoundary = window.scrollY + pageSections[0].getBoundingClientRect().y;
const sectionHeight = pageSections[0].getBoundingClientRect().height;

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

let removeActiveClassFromListItem = () => {
    let previousItem = document.querySelector('.menu__link.active');
    if (previousItem !== null) {
        previousItem.classList.remove('active');
    }
}

let addActiveClassOnListItem = (clickedItem) => {
    removeActiveClassFromListItem();
    clickedItem.classList.add('active');
}

let removeActiveClassFromSection = () => {
    let previousSection = document.querySelector('section.active');
    if (previousSection !== null) {
        previousSection.classList.remove('active');
    }
}

let addActiveClassOnSection = (clickedSection) => {
    removeActiveClassFromSection();
    clickedSection.classList.add('active');
}

let scrollToSection = (targetSection) => {
    let topBoundry = targetSection.getBoundingClientRect().top + window.scrollY + 1;
    window.scrollTo(0, topBoundry);
}

let hideScrollBarOnNoScroll = () => {
    let previousY = window.scrollY;
    setTimeout(() => {
        let currentY = window.scrollY;
        if (currentY !== previousY) {
            hideNavBar();
        }
    }, 5000)
}

let showUpButton = () => {
    let button = document.getElementById("UpButton");
    button.style.display = 'block'
    button.addEventListener('click', () => window.scrollTo(0, 0));
}

let hideUpButton = () => {
    let button = document.getElementById("UpButton");
    button.style.display = 'none'
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
let buildNavbar = () => {
    const noOfSections = pageSections.length;
    if (noOfSections > 0) {
        let navFragment = document.createDocumentFragment();
        let navItem;

        for (let i = 0; i < noOfSections; i++) {
            navItem = document.createElement('li');
            navItem.classList.add('menu__link');
            navItem.setAttribute('id', 'item' + i + 1);
            navItem.textContent = pageSections[i].dataset.nav;
            navFragment.appendChild(navItem);
        }
        navMenuList.appendChild(navFragment);
    }
}

let showNavBar = () => {
    navMenuList.classList.remove('hidden');
    navMenuList.classList.add('shown');
}

let hideNavBar = () => {
    removeActiveClassFromListItem();
    navMenuList.classList.remove('shown');
    navMenuList.classList.add('hidden');
}

// Add class 'active' to section when near top of viewport
let detectActiveSectionOnScroll = (windowYpos) => {
    let activeSection, activeListItem;
    console.log(windowYpos);
    for (let i = 0; i < pageSections.length; i++) {
        if (windowYpos > (pageSections[i].getBoundingClientRect().top + windowYpos) && windowYpos < (pageSections[i].getBoundingClientRect().top + windowYpos) + sectionHeight) {
            activeSection = pageSections[i];
            activeListItem = document.getElementById('item' + i + 1);
            removeActiveClassFromSection();
            addActiveClassOnSection(activeSection);
            removeActiveClassFromListItem();
            addActiveClassOnListItem(activeListItem);
        }
    }
}

// Scroll to anchor ID using scrollTO event
onNavItemClicked = (event) => {
    event.preventDefault();
    let sectionNumber = event.target.textContent.charAt(event.target.textContent.length - 1);
    let targetSection = document.getElementById("section" + sectionNumber);

    addActiveClassOnListItem(event.target);
    addActiveClassOnSection(targetSection);
    scrollToSection(targetSection);
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
document.onload = buildNavbar();

// Scroll to section on link click
navMenuList.addEventListener('click', onNavItemClicked)

// Set sections as active
document.onscroll = () => {
    //hideScrollBarOnNoScroll();
    if (window.scrollY >= window.innerHeight * 0.7) {
        showNavBar();
        showUpButton();
    } else {
        hideNavBar();
        hideUpButton();
    }
    detectActiveSectionOnScroll(window.scrollY);
}