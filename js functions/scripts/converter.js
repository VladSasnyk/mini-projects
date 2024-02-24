const currencyInfoButton = document.querySelector('.converter__info');
const currencyInfo = document.querySelector('.converter__currency')
const select1 = document.querySelector('.select1');
const select2 = document.querySelector('.select2');
const changeReverse = document.querySelector('.converter__changeReverse');
const changeButton = document.querySelector('.change__button');
const changeInput = document.querySelector('.change__input');
const changeResult = document.querySelector('.change__result');

async function fetchShowCurrency() {
    const response = await fetch('data/currency.json');
    if (!response.ok) {
        throw new Error('Could not fetch data');
    }
    const data = await response.json();
    return showCurrency(data);
}
const showCurrency = async (data) => {
    const info = await data;
    info.map(i => {
        const newLi = document.createElement('li');
        newLi.textContent = `${i.txt} - ${i.rate} ГРН`;
        currencyInfo.appendChild(newLi);

        const newOption = document.createElement('option');
        newOption.value = parseFloat(i.rate);
        newOption.textContent = i.txt;
        const newOption2 = document.createElement('option');
        newOption2.value = parseFloat(i.rate);
        newOption2.textContent = i.txt;
        
        select1.appendChild(newOption);
        select2.appendChild(newOption2);
    })
    select2.value = info[25].rate;

}

fetchShowCurrency();

currencyInfoButton.addEventListener('click', () => {
    currencyInfo.classList.toggle('active');
});

changeReverse.addEventListener('click',()=>{ 
    const select2Value = select2.value;
    const select3Value = select1.value;
    select1.value = select2Value;
    select2.value = select3Value;
    changeCurrency();
});


const changeCurrency = () =>{
    const val1 = parseFloat(select1.value);
    const val2 = parseFloat(select2.value);
    const changeVal = parseFloat(changeInput.value);
    let result = 0;
    let textResult =  changeResult.textContent = 'Введіть яку кількість валюти ви хочете конвертувати!';
    if(changeVal > 0){
        result = (changeVal * val1 / val2).toFixed(3);
        textResult = changeResult.textContent = `Ви можете купити ${result} вибраної валюти`;
    }
    return textResult;
}


changeButton.addEventListener('click',changeCurrency);


    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          changeCurrency();
        }
    });

