import {sendFormData} from './network.js';
import {mapReset, reRender} from './map.js';
import {isEscapeKey} from './util.js';

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
  timeoutField.value = this.value;
}

function onTimeoutFieldInput () {
  timeinField.value = this.value;
}

timeinField.addEventListener('input', onTimeinFieldInput);
timeoutField.addEventListener('input', onTimeoutFieldInput);

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', () => {
  getInitialPageState();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  const isValid = pristine.validate();
  if (isValid) {
    sendFormData(form, sendSuccessfulForm, sendUnsuccessfulForm);  }
});

const filterForm = document.querySelector('.map__filters');
function filterReset() {
  filterForm.reset();
  reRender();
}

function sendSuccessfulForm() {
  blockSubmitButton();
  openSuccessMessage();
  getInitialPageState();
  unblockSubmitButton ();
  filterReset();
}

function sendUnsuccessfulForm() {
  blockSubmitButton();
  openErrorMessage();
  unblockSubmitButton ();
}

const submitButton = form.querySelector('.ad-form__submit');
function blockSubmitButton ()  {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка';
}

function unblockSubmitButton () {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');

function getInitialPageState(){
  const previewAvatar = document.querySelector('.ad-form-header__preview img');
  const previewAdFoto = document.querySelector('.ad-form__photo img');
  if (previewAvatar){
    previewAvatar.src = 'img/muffin-grey.svg';
  }
  if (previewAdFoto){
    previewAdFoto.remove();
  }
  form.reset();
  setTimeout(() => {

    mapReset();
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: Number(valueElement.min),
        max: 100000,
      },
    });
    sliderElement.noUiSlider.set(Number(valueElement.min));
  }, 500);

  filterReset();
}

const  successPopupTemplate = document.querySelector('#success').content.querySelector('.success');
function openSuccessMessage() {
  const newElement = successPopupTemplate.cloneNode(true);
  document.body.append(newElement);

  document.addEventListener('keydown', closeSuccessMessage);
  document.addEventListener('click', closeSuccessMessage);
}

function closeSuccessMessage(evt) {
  const successPopup = document.querySelector('.success');
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }
  successPopup.remove();
  document.removeEventListener('keydown', closeSuccessMessage);
  document.removeEventListener('click', closeSuccessMessage);
}

const  errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
function openErrorMessage() {
  const newElement = errorPopupTemplate.cloneNode(true);
  document.body.append(newElement);

  document.addEventListener('keydown', closeErrorMessage);
  document.addEventListener('click', closeErrorMessage);
}

function closeErrorMessage(evt) {
  const errorPopup = document.querySelector('.error');
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }
  errorPopup.remove();
  document.removeEventListener('keydown', closeErrorMessage);
  document.removeEventListener('click', closeErrorMessage);
}


