const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'validate-element',
  errorTextParent: 'validate-element',
  errorClass: 'form__element--invalid',
  successClass: 'form__element--valid',
  errorTextTag: 'p',
  errorTextClass: 'form__error-text'
});

const roomNumberField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');

function validateCapacity () {
  return  capacityField.value === '0' ? roomNumberField.value === '100': roomNumberField.value >= capacityField.value && roomNumberField.value <= 3;
}

function getCapacityErrorMessage () {
  if (capacityField.value === '0') {
    return 'Не для гостей 100 комнат ';
  }
  if (roomNumberField.value === '100') {
    return '100 комнат - не для гостей';
  }
  return 'Гостей больше, чем комнат';
}

pristine.addValidator(roomNumberField, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);

function onRoomNumberChange () {
  pristine.validate(capacityField);
  capacityField.nextElementSibling.textContent = '';
}
function onCapacityChange () {
  pristine.validate(roomNumberField);
  roomNumberField.nextElementSibling.textContent = '';
}

roomNumberField.addEventListener('change', onRoomNumberChange);
capacityField.addEventListener('change', onCapacityChange);

const priceField = form.querySelector('#price');
const typeField = form.querySelector('#type');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function onTypeFieldInput(){
  const type = this.value;
  //console.log(type);
  priceField.min = minPrice[type];
  priceField.placeholder = minPrice[type];
  pristine.validate(priceField);
}

typeField.addEventListener('input', onTypeFieldInput);

function validatePrice (value) {
  return value >= minPrice[typeField.value];
}

function getPriceErrorMessage () {
  return `Не менее ${minPrice[typeField.value]} руб. за ночь`;
}

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const timeinField = form.querySelector('#timein');
const timeoutField = form.querySelector('#timeout');

function onTimeinFieldInput () {
  timeoutField.querySelector(`[value="${  this.value  }"]`).selected = true;
}

function onTimeoutFieldInput () {
  timeinField.querySelector(`[value="${  this.value  }"]`).selected = true;
}

timeinField.addEventListener('input', onTimeinFieldInput);
timeoutField.addEventListener('input', onTimeoutFieldInput);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();

  /*const isValid = pristine.validate();
  if (isValid) {
    //console.log('Можно отправлять');
  } else {
    //console.log('Форма невалидна');
  }*/
});
