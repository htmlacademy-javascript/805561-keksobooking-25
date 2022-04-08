const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
//const slider = form.querySelector('.ad-form__slider');

const filter = document.querySelector('.map__filters');
const filterSelects = filter.querySelectorAll('.map__filter');
const filterFieldset = filter.querySelector('.map__features');


function getPageActive () {
  form.classList.remove('ad-form--disabled');
  formFieldsets .forEach((formFieldset) => {
    formFieldset.disabled = false;
  });
  //slider.разблокировать;
  filter.classList.remove('map__filters--disabled');
  filterSelects .forEach((filterSelect) => {
    filterSelect.disabled = false;
  });
  filterFieldset.disabled = false;
}
//getPageActive ();
// вызывается по событию загрузки карты


function getPageInactive () {
  form.classList.add('ad-form--disabled');
  formFieldsets .forEach((formFieldset) => {
    formFieldset.disabled = true;
  });
  //slider.заблокировать;
  filter.classList.add('map__filters--disabled');
  filterSelects .forEach((filterSelect) => {
    filterSelect.disabled = true;
  });
  filterFieldset.disabled = true;
}
//getPageInactive ();

export {getPageInactive, getPageActive};