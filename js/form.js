import {sendFormData} from './network.js';
import {mapReset, reRender} from './map.js';
import {isEscapeKey} from './util.js';

const PRICE_MAX_VALUE = 100000;
const TIMEOUT_VALUE = 500;
const PRICE_MIN_VALUE = 0;

const MinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const formElement = document.querySelector('.ad-form');
const pristine = new Pristine(formElement, {
  classTo: 'validate-element',
  errorTextParent: 'validate-element',
  errorClass: 'form__element--invalid',
  successClass: 'form__element--valid',
  errorTextTag: 'p',
  errorTextClass: 'form__error-text'
});

const roomNumberFieldElement = formElement.querySelector('[name="rooms"]');
const capacityFieldElement = formElement.querySelector('[name="capacity"]');

function validateCapacity () {
  return  capacityFieldElement.value === '0' ? roomNumberFieldElement.value === '100': roomNumberFieldElement.value >= capacityFieldElement.value && roomNumberFieldElement.value <= 3;
}

function getCapacityErrorMessage () {
  if (capacityFieldElement.value === '0') {
    return 'Не для гостей 100 комнат ';
  }
  if (roomNumberFieldElement.value === '100') {
    return '100 комнат - не для гостей';
  }
  return 'Гостей больше, чем комнат';
}

pristine.addValidator(roomNumberFieldElement, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(capacityFieldElement, validateCapacity, getCapacityErrorMessage);

function onRoomNumberChange () {
  pristine.validate(capacityFieldElement);
  capacityFieldElement.nextElementSibling.textContent = '';
}
function onCapacityChange () {
  pristine.validate(roomNumberFieldElement);
  roomNumberFieldElement.nextElementSibling.textContent = '';
}

roomNumberFieldElement.addEventListener('change', onRoomNumberChange);
capacityFieldElement.addEventListener('change', onCapacityChange);

const priceFieldElement = formElement.querySelector('#price');
const typeFieldElement = formElement.querySelector('#type');


function onTypeFieldInput(){
  const type = this.value;
  priceFieldElement.min = MinPrice[type];
  priceFieldElement.placeholder = MinPrice[type];
  setTimeout(() => {
    pristine.validate(priceFieldElement);
  }, TIMEOUT_VALUE);
}

typeFieldElement.addEventListener('input', onTypeFieldInput);

function validatePrice () {
  return priceFieldElement.value >= MinPrice[typeFieldElement.value];
}

function getPriceErrorMessage () {
  return `Не менее ${MinPrice[typeFieldElement.value]} руб. за ночь`;
}

pristine.addValidator(priceFieldElement, validatePrice, getPriceErrorMessage);

const timeinFieldElement = formElement.querySelector('#timein');
const timeoutFieldElement = formElement.querySelector('#timeout');

function onTimeinFieldInput () {
  timeoutFieldElement.value = this.value;
}

function onTimeoutFieldInput () {
  timeinFieldElement.value = this.value;
}

timeinFieldElement.addEventListener('input', onTimeinFieldInput);
timeoutFieldElement.addEventListener('input', onTimeoutFieldInput);

const resetButtonElement = document.querySelector('.ad-form__reset');
resetButtonElement.addEventListener('click', () => {
  getInitialPageState();
  pristine.validate(priceFieldElement);
});

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
  const isValid = pristine.validate();
  if (isValid) {
    sendFormData(formElement, sendSuccessfulForm, sendUnsuccessfulForm);
  }
});

const filterFormElement = document.querySelector('.map__filters');
function filterReset() {
  filterFormElement.reset();
  reRender();
}

function formReset() {
  priceFieldElement.min = PRICE_MIN_VALUE;
  priceFieldElement.placeholder = PRICE_MIN_VALUE;
  formElement.reset();
}

function sendSuccessfulForm() {
  blockSubmitButton();
  openSuccessMessage();
  getInitialPageState();
  unblockSubmitButton ();
}

function sendUnsuccessfulForm() {
  blockSubmitButton();
  openErrorMessage();
  unblockSubmitButton ();
}

const submitButtonElement = formElement.querySelector('.ad-form__submit');
function blockSubmitButton ()  {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Отправка';
}

function unblockSubmitButton () {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
}

const sliderElement = document.querySelector('.ad-form__slider');

function getInitialPageState(){
  const previewAvatarElement = document.querySelector('.ad-form-header__preview img');
  const previewAdFotoElement = document.querySelector('.ad-form__photo img');
  if (previewAvatarElement){
    previewAvatarElement.src = 'img/muffin-grey.svg';
  }
  if (previewAdFotoElement){
    previewAdFotoElement.remove();
  }
  filterReset();
  formReset();
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: PRICE_MIN_VALUE,
      max: PRICE_MAX_VALUE,
    },
  });
  sliderElement.noUiSlider.set(PRICE_MIN_VALUE);
  setTimeout(() => {
    mapReset();
  }, TIMEOUT_VALUE);
}

const  successPopupTemplateElement = document.querySelector('#success').content.querySelector('.success');
function openSuccessMessage() {
  const newElement = successPopupTemplateElement.cloneNode(true);
  document.body.append(newElement);

  document.addEventListener('keydown', onSuccessMessageClose);
  document.addEventListener('click', onSuccessMessageClose);
}

function onSuccessMessageClose(evt) {
  const successPopupElement = document.querySelector('.success');
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }
  successPopupElement.remove();
  document.removeEventListener('keydown', onSuccessMessageClose);
  document.removeEventListener('click', onSuccessMessageClose);
}

const  errorPopupTemplateElement = document.querySelector('#error').content.querySelector('.error');
function openErrorMessage() {
  const newElement = errorPopupTemplateElement.cloneNode(true);
  document.body.append(newElement);

  document.addEventListener('keydown', onErrorMessageClose);
  document.addEventListener('click', onErrorMessageClose);
}

function onErrorMessageClose(evt) {
  const errorPopupElement = document.querySelector('.error');
  if (isEscapeKey(evt)) {
    evt.preventDefault();
  }
  errorPopupElement.remove();
  document.removeEventListener('keydown', onErrorMessageClose);
  document.removeEventListener('click', onErrorMessageClose);
}


