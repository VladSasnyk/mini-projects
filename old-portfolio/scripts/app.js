const listItems = document.querySelectorAll('header li');
const sections = document.querySelectorAll('.section');
const logo = document.querySelector('.header__logo');

const selectSection = (item) => {
    const sectionName = item.target.getAttribute('data-section');

    listItems.forEach((li) => li.classList.toggle('active', li === item.target));
    sections.forEach((section) => section.classList.toggle('active', section.classList.contains(sectionName)));
};

listItems.forEach((item) => item.addEventListener('click', selectSection));
logo.addEventListener('click', selectSection);

//change theme

document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme');
    
    // Встановлюємо клас за замовчуванням
    document.body.classList.add(savedTheme === 'light' ? 'light-theme' : 'dark-theme');

    document.addEventListener('click', function (event) {
        if (event.target.id === 'themeToggleBtn') {
            toggleTheme();
        }
    });
});

function toggleTheme() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    // Виправлення логіки для правильного встановлення теми
    if (isDarkTheme) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}



//burger header
const burgerMenu = document.querySelector('.header__listMobile');
const burgerButton = document.querySelector('.hamburger');
burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('active');
    burgerMenu.classList.toggle('active');
})

const burgerItems = document.querySelectorAll('.header__listMobile li');


for (const item of burgerItems) {
    item.addEventListener('click', () => {
        burgerButton.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    })
}