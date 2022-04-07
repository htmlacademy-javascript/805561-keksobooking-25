import {getRandomFractionalNumber, getRandomInteger, getArrayRandomElement, getArrayRandomElements} from './util.js';

const PRICE_MAX = 1000;
const PRICE_MIN = 10;
const ARRAY_OFFER = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const ROOMS_MAX = 10;
const ROOMS_MIN = 1;
const GUESTS_MAX = 10;
const GUESTS_MIN = 1;
const ARRAY_CHECKIN = ['12:00', '13:00', '14:00'];
const ARRAY_CHECKOUT = ['12:00', '13:00', '14:00'];

const ARRAY_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ARRAY_PHOTOS = [
  '',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const LAT_MAX = 35.70000;
const LAT_MIN = 35.65000;
const LNG_MAX = 139.80000;
const LNG_MIN = 139.70000;
const SIMILAR_AD_COUNT = 10;

function createAd (itemNumber) {
  const ad = {};
  const adAuthor = {};
  const adOffer = {};
  const adLocation = {};
  const counter = itemNumber + 1;

  adAuthor.avatar = `img/avatars/user${  String(counter).padStart(2, '0')  }.png`;

  adLocation.lat = getRandomFractionalNumber(LAT_MIN, LAT_MAX, 5);
  adLocation.lng = getRandomFractionalNumber(LNG_MIN, LNG_MAX, 5);

  adOffer.title = `Предложение ${  counter}`;
  adOffer.address = `${adLocation.lat  }, ${  adLocation.lng}`;
  adOffer.price = getRandomInteger(PRICE_MIN, PRICE_MAX);
  adOffer.type = getArrayRandomElement(ARRAY_OFFER);
  adOffer.rooms = getRandomInteger(ROOMS_MIN, ROOMS_MAX);
  adOffer.guests = getRandomInteger(GUESTS_MIN, GUESTS_MAX);
  adOffer.checkin = getArrayRandomElement(ARRAY_CHECKIN);
  adOffer.checkout = getArrayRandomElement(ARRAY_CHECKOUT);
  adOffer.features = getArrayRandomElements(ARRAY_FEATURES);
  adOffer.description = `Текст описания ${  counter}`;
  adOffer.photos = getArrayRandomElements(ARRAY_PHOTOS);

  ad.author = adAuthor;
  ad.offer = adOffer;
  ad.location = adLocation;

  return ad;
}

// фунция для создания массива из объектов-оъявлений
function createAds (elementsCount) {
  const adsArray = [];
  for (let i = 0; i < elementsCount; i++) {
    adsArray[i] = createAd(i);
  }
  return adsArray;
}

const createAdsData = createAds(SIMILAR_AD_COUNT);

//console.log(createAdsData);


export {createAdsData};
