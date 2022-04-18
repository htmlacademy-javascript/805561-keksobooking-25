const ALERT_SHOW_TIME = 7000;

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

export {isEscapeKey, isNumberIntervalIncluded, debounce, errorMessage};
