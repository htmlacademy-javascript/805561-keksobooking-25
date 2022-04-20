const formElement = document.querySelector('.ad-form');
const formFieldsetElements = formElement.querySelectorAll('fieldset');
const sliderElement = formElement.querySelector('.ad-form__slider');

const filterElement = document.querySelector('.map__filters');
const filterSelectElements = filterElement.querySelectorAll('.map__filter');
const filterFeaturesElement = filterElement.querySelector('.map__features');


function getPageActive () {
  formElement.classList.remove('ad-form--disabled');
  formFieldsetElements .forEach((formFieldset) => {
    formFieldset.disabled = false;
  });
  sliderElement.disabled = false;
}

function getFilterActive() {
  filterElement.classList.remove('map__filters--disabled');
  filterSelectElements .forEach((filterSelect) => {
    filterSelect.disabled = false;
  });
  filterFeaturesElement.disabled = false;
}

function getPageInactive () {
  formElement.classList.add('ad-form--disabled');
  formFieldsetElements .forEach((formFieldset) => {
    formFieldset.disabled = true;
  });
  sliderElement.disabled = true;
  filterElement.classList.add('map__filters--disabled');
  filterSelectElements .forEach((filterSelect) => {
    filterSelect.disabled = true;
  });
  filterFeaturesElement.disabled = true;
}

export {getPageInactive, getPageActive, getFilterActive};
