import '../styles/reset.scss'
import '../styles/mixins.scss'
import '../styles/styles.scss'

const classes = {
    opened: 'opened',
}
const header = document.querySelector('.header');
const menuButton = document.querySelector('.header-menu__button');
const menuLink = document.querySelectorAll('.menu-link');

const toggleMenu = () => header.classList.toggle(classes.opened);
const scrollToSection = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');

    if(!href && !href.startsWith('#')) return;

    const section = href.slice(1);
    const top = document.getElementById(section).offsetTop || 0;
    window.scrollTo({ top, behavior: 'smooth'});
}

const formatValue = (value) => value < 10 ? `0${value}` : value;

const getTimerValues = (diff) => {
    return {
        seconds: (diff / 1000) % 60,
        minutes: (diff / (1000 * 60)) % 60,
        hours: (diff / (1000 * 3600)) % 24,
        days: (diff/ (1000 * 3600 * 24)),
    };
};

const setTimerValues = (values) => {
    Object.entries(values).forEach(([key, value]) => {
        const timerValue = document.getElementById(key);
        timerValue.innerText = formatValue(Math.floor(value));
    })
}

const startTimer = (date) => {
    const id = setInterval(() => {
        const diff = new Date(date).getTime() - new Date().getTime();
        setTimerValues(getTimerValues(diff))   
        
        if(diff < 0) {
            clearInterval(id)
            return
        }
    }, 1000);
}

startTimer('June 28, 2023 00:00:00');

menuButton.addEventListener('click', toggleMenu);
menuLink.forEach((link) => link.addEventListener('click', scrollToSection));