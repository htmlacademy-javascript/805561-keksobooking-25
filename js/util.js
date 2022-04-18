const ALERT_SHOW_TIME = 7000;

// Результат: целое число из диапазона "от...до"
function getRandomInteger(min, max) {
  if(max > min && min >= 0){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return false;
}

//имя_функции(от, до, количество_знаков_после_запятой);
// Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
function getRandomFractionalNumber(min, max, numberSymbols) {
  if(max > min && min >= 0 && numberSymbols >= 0){
    const randomNumber = (Math.random() * (max - min)) + min;  //случайное дробное в диапазоне [min, max)
    const cropNumber = randomNumber.toFixed(numberSymbols);

    return parseFloat(cropNumber);
  }
  return false;
}

// получение случайного элемента массива
function getArrayRandomElement (array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

//получение случайного true/false
function boolean () {
  return getRandomInteger(0, 1);
}

//получение нескольких случайных элеменов массива
function getArrayRandomElements (array) {
  return array.filter(() => boolean ());
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

//функция для определения, входит ли число в заданный интервал
function isNumberIntervalIncluded (min, max, number) {
  return number < max && number > min;
}

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

//показать сообщение об ошибке, если при загрузке данных с сервера произошла ошибка запроса
function errorMessage  () {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'fixed';
  alertContainer.style.width = '500px';
  alertContainer.style.top = '100px';
  alertContainer.style.left = '50%';
  alertContainer.style.transform = 'translateX(-50%)';
  alertContainer.style.padding = '50px 30px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.lineHeight = '26px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#fff';
  alertContainer.style.borderRadius = '10px';
  alertContainer.textContent = 'При загрузке данных с сервера произошла ошибка, но вы можете опубликовать свое объявление :)';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandomFractionalNumber, getRandomInteger, getArrayRandomElement, getArrayRandomElements, boolean, isEscapeKey, isNumberIntervalIncluded, debounce, errorMessage};
