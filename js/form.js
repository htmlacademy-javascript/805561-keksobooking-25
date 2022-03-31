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
