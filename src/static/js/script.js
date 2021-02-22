let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

navBarToggle.addEventListener('click', function () {
    mainNav.classList.toggle('active');
});

let imageTracker = 'moon';

function darkmode() {

    let project = document.getElementsByClassName('project-info');
    let btns = document.getElementsByClassName('btn');

    let light = document.getElementById('light');
    let dark = document.getElementById('dark');

    let darkModeIcon = document.getElementById('dark-mode-icon');
    let darkModeNav =  document.getElementsByClassName('nav-links');
    let darkModeSocialIcons =  document.getElementsByClassName('social');

    if(prefersDarkScheme.matches){
        document.body.classList.toggle('light-theme');
    } else {
        document.body.classList.toggle('dark-theme');
        document.querySelector('i').classList.toggle('dark-theme');
        document.getElementById("footer").classList.toggle("darkmode--footer");

        for (let i = 0; i < project.length; i++) {
            project[i].classList.toggle("darkmode--project");
        }

        for(let i = 0; i < darkModeNav.length; i++){
            darkModeNav[i].classList.toggle('darkmode--nav');
        }

        for (let i = 0; i < btns.length; i++) {
            btns[i].classList.toggle("darkmode--btn");

        }

        for (let i = 0; i < darkModeSocialIcons.length; i++) {
            darkModeSocialIcons[i].classList.toggle("darkmode--social");
        }
    }

    if (imageTracker === 'moon') {
        light.classList.add("hidden");
        dark.classList.remove("hidden");

        darkModeIcon.classList.add('fa-sun');

        imageTracker = 'sun';
    } else {
        dark.classList.add("hidden");
        light.classList.remove("hidden");

        darkModeIcon.classList.remove('fa-sun');

        imageTracker = 'moon';
    }
}

// if (prefersDarkScheme.matches) {
//     darkmode()
// }
