const ALERT_SHOW_TIME = 7000;

function getRandomInteger(min, max) {
  if(max > min && min >= 0){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return false;
}

function getRandomFractionalNumber(min, max, numberSymbols) {
  if(max > min && min >= 0 && numberSymbols >= 0){
    const randomNumber = (Math.random() * (max - min)) + min;
    const cropNumber = randomNumber.toFixed(numberSymbols);

    return parseFloat(cropNumber);
  }
  return false;
}

function getArrayRandomElement (array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

function boolean () {
  return getRandomInteger(0, 1);
}

function getArrayRandomElements (array) {
  return array.filter(() => boolean ());
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

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
