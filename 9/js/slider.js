import {minPriceValue} from './form.js';

const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');
const associatedElement = document.querySelector('#type');

valueElement.value = 1000;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 10,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();

});

associatedElement.addEventListener('input', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPriceValue,
      max: 100000,
    },
  });
  sliderElement.noUiSlider.set(minPriceValue);
});

//это чтобы слайдер двигался при изменении цены ручками
valueElement.addEventListener('input', () => {
  sliderElement.noUiSlider.set(valueElement.value);
});
