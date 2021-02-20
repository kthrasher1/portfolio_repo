let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: light)');

navBarToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
});
let imageTracker = 'moon';

function darkmode() {

    document.querySelector("body").classList.toggle("darkmode--on");
    document.querySelector("a").classList.toggle("darkmode--nav");
    document.getElementById("footer").classList.toggle("darkmode--footer");

    let btns = document.getElementsByClassName('btn');

    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.toggle("darkmode--btn");

        let styleElem = document.head.appendChild(document.createElement("style"));
        styleElem.innerHTML = ".btn:hover {background: #F1F1F1 !important;}";
    }

    let project = document.getElementsByClassName('project-info');
    for (let i = 0; i < project.length; i++) {
        project[i].classList.toggle("darkmode--project");
    }

    let image = document.getElementById('js-dark-mode');
    let image_two = document.getElementById('js-dark-mode-image');
    let light = document.getElementById('light');
    let dark = document.getElementById('dark');

    if (imageTracker === 'moon') {
        light.classList.add("hidden");
        dark.classList.remove("hidden");
        image.src = 'static/img/sun.svg';
        image_two.src = 'static/img/sun.svg';

        imageTracker = 'sun';
    } else {
        dark.classList.add("hidden");
        light.classList.remove("hidden");
        image.src = 'static/img/half-moon.svg';
        image_two.src = 'static/img/half-moon.svg';

        imageTracker = 'moon';
    }

}

if (prefersDarkScheme.matches) {
    darkmode()
}
