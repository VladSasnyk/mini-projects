const timerButton = document.querySelector('.timer__button');
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__buttonClose');
const timerInfo = document.querySelector('.timer__info')
let isTimer = false;


const modalPrevenDefault = e => {
    e.preventDefault();
    e.stopPropagation()
}
const closeModal = () => {
    backdrop.classList.add('disable');
}
const openModal = () => {
    if (isTimer) {
        return timerInfo.classList.add('active'); ;
    }
    backdrop.classList.remove('disable');
    timerInfo.classList.remove('active');
}




backdrop.addEventListener('click', closeModal);
timerButton.addEventListener('click', openModal);
modal.addEventListener('click', modalPrevenDefault);
modalClose.addEventListener('click', closeModal);



let countdown;
const timeLeftDisplay = document.getElementById('time-left');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

const startCountdown = ()=> {
    isTimer = true;
    closeModal();
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    const totalTime = hours * 3600 + minutes * 60 + seconds;
    let remainingTime = totalTime;
    countdown = setInterval(() => {
        const hoursLeft = Math.floor(remainingTime / 3600);
        const minutesLeft = Math.floor((remainingTime % 3600) / 60);
        const secondsLeft = remainingTime % 60;
        const timeString = `${hoursLeft.toString().padStart(2, '0')}год ${minutesLeft.toString().padStart(2, '0')}хв ${secondsLeft.toString().padStart(2, '0')}сек`;
        timeLeftDisplay.textContent = timeString;
        if (remainingTime === 0) {
            clearInterval(countdown);
            isTimer = false;
        } else {
            remainingTime--;
        }
    }, 1000);
}

const resetCountdown =() => {
    isTimer = false;
    clearInterval(countdown);
    timerInfo.classList.remove('active');
    timeLeftDisplay.textContent = '00год 00хв 00сек';
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
}

startButton.addEventListener('click', startCountdown);
resetButton.addEventListener('click', resetCountdown);