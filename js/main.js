//имя_функции(от, до);
// Результат: целое число из диапазона "от...до"
function getRandomInteger (min, max) {
  if(max > min && min >= 0){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return false;
}
getRandomInteger(5,10);


//имя_функции(от, до, количество_знаков_после_запятой);
// Результат: число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"

function getRandomFractionalNumber(min, max, numberSymbols ) {
  if(max > min && min >= 0 && numberSymbols >= 0){
    const randomNumber = (Math.random() * (max - min +1)) + min;  //случайное дробное в диапазоне [min, max)
    const multiplier = Math.pow(10, numberSymbols); // сдвиг точки на количество символов

    return (Math.floor(randomNumber * multiplier ))/ multiplier;
  }
  return false;
}
getRandomFractionalNumber(-5, 0, 3);

//либо вариант с toFixed


function getRandomFractionalNumberZwei(min, max, numberSymbols ) {
  if(max > min && min >= 0 && numberSymbols >= 0){
    const randomNumber = (Math.random() * (max - min)) + min;  //случайное дробное в диапазоне [min, max)
    const cropNumber = randomNumber.toFixed(numberSymbols);

    return parseFloat(cropNumber);
  }
  return false;
}
getRandomFractionalNumberZwei(0, 5, 3);


