const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');
const associatedElement = document.querySelector('#type');

const PRICE_MAX_VALUE = 100000;
const PRICE_MIN_VALUE = 0;

function createSlider() {
  noUiSlider.create(sliderElement, {
    range: {
      min: PRICE_MIN_VALUE,
      max: PRICE_MAX_VALUE,
    },
    start: PRICE_MIN_VALUE,
    step: 1,
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
        min: Number(valueElement.min),
        max: PRICE_MAX_VALUE,
      },
    });
    sliderElement.noUiSlider.set(Number(valueElement.min));
  });

  valueElement.addEventListener('input', () => {
    sliderElement.noUiSlider.set(valueElement.value);
  });
}
createSlider();

export {createSlider};
