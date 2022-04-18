const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');
const associatedElement = document.querySelector('#type');

valueElement.value = Number(valueElement.min);
function createSlider() {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 1000,
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
        max: 100000,
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
