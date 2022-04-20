import {isNumberIntervalIncluded} from './util.js';

const Price = {
  any: [0, 100000],
  low: [0, 9999],
  middle: [10000, 50000],
  high: [50001, 100000]
};

const filterFormElement = document.querySelector('.map__filters');

function getHousingTypeAccordance(ad, typeHousing) {
  return typeHousing.value === 'any' || ad.offer.type === typeHousing.value;
}

function getHousingPriceAccordance(ad, priceHousing) {
  return isNumberIntervalIncluded(...Price[priceHousing.value], ad.offer.price);
}

function getHousingRoomsAccordance(ad, roomsHousing) {
  return roomsHousing.value === 'any' || ad.offer.rooms === Number(roomsHousing.value);
}

function getHousingGuestsAccordance(ad, guestsHousing) {
  return guestsHousing.value === 'any' || ad.offer.guests === Number(guestsHousing.value);
}

function getFeaturesAccordance(ad, housingFeatures) {
  let boolean = true;
  housingFeatures.forEach((el)=> {
    if(ad.offer.features) {
      const accordance = ad.offer.features.some((feature) => feature === el.value);
      if (!accordance) {
        boolean = false;
      }
    }
  });
  return boolean;
}

function getFilterAd (ad)  {
  const housingTypeElement = filterFormElement.querySelector('#housing-type');
  const housingPriceElement = filterFormElement.querySelector('#housing-price');
  const housingRoomsElement = filterFormElement.querySelector('#housing-rooms');
  const housingGuestsElement = filterFormElement.querySelector('#housing-guests');
  const housingFeaturesElement = filterFormElement.querySelectorAll('[name="features"]:checked');

  return  (ad.offer.type && getHousingTypeAccordance(ad, housingTypeElement))
      && (ad.offer.price && getHousingPriceAccordance(ad, housingPriceElement))
      && (ad.offer.rooms && getHousingRoomsAccordance(ad, housingRoomsElement))
      && (ad.offer.guests && getHousingGuestsAccordance(ad, housingGuestsElement))
      && (ad.offer.features && getFeaturesAccordance(ad, housingFeaturesElement));
}

function filterArray(data) {
  return data.filter(getFilterAd);
}


export {filterArray};
