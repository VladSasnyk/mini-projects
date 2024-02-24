const listItems = document.querySelectorAll('.header li');

const logo = document.querySelector('.header__logo');

const selectSection = (item) => {
    const sectionName = item.target.getAttribute('data-section');
    const sections = document.querySelectorAll('.section');
    listItems.forEach((li) => li.classList.toggle('active', li === item.target));
    sections.forEach((section) => section.classList.toggle('active', section.classList.contains(sectionName)));
};

listItems.forEach((item) => item.addEventListener('click', selectSection));
logo.addEventListener('click', selectSection);



// Home text  
consoleText(['Ласкаво просимо!', 'Спробуйте функції', 'Дякую.'], 'text', ['tomato', 'black', 'lightblue']);


function consoleText(words, id, colors) {
    if (colors === undefined) {
        colors = ['#fff']
    }
    ;
    let visible = true;
    const con = document.getElementById('console');
    let letterCount = 1;
    let x = 1;
    let waiting = false;
    const target = document.getElementById(id)
    target.setAttribute('style', 'color:' + colors[0])
    window.setInterval(function () {

        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(function () {
                let usedColor = colors.shift();
                colors.push(usedColor);
                let usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', 'color:' + colors[0])
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function () {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount)
            letterCount += x;
        }
    }, 120)
    window.setInterval(function () {
        if (visible === true) {
            con.className = 'console-underscore hidden'
            visible = false;
        } else {
            con.className = 'console-underscore'

            visible = true;
        }
    }, 200)
}

//Burger
const footer = document.querySelector('.footer');
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


//Footer

const footerActive = document.querySelector('.footerActive');


footerActive.addEventListener('mouseenter', () => {
  footer.classList.add('show');
});


footerActive.addEventListener('mouseleave', () => { 
        footer.classList.remove('show');
        burgerButton.classList.remove('active');
});
footer.addEventListener('mouseenter', () => {
    footer.classList.add('show');
    burgerButton.classList.remove('add');
  });
