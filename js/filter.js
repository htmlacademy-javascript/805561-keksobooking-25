import {isNumberIntervalIncluded} from './util.js';

const prise = {
  any: [0, 100000],
  low: [0, 9999],
  middle: [10000, 50000],
  high: [50001, 100000]
};

const filterForm = document.querySelector('.map__filters');

function getAdRank (ad)  {
  const housingType = filterForm.querySelector('#housing-type');
  const housingPrice = filterForm.querySelector('#housing-price');
  const housingRooms = filterForm.querySelector('#housing-rooms');
  const housingGuests = filterForm.querySelector('#housing-guests');
  const housingFeatures = filterForm.querySelectorAll('[name="features"]:checked');
  let rank = 0;
  if (ad.offer.type && (housingType.value === 'any' || ad.offer.type === housingType.value)) {
    rank += 1;
  }
  if (ad.offer.price && isNumberIntervalIncluded(...prise[housingPrice.value], ad.offer.price)) {
    rank += 1;
  }
  if (ad.offer.rooms && (housingRooms.value === 'any' || ad.offer.rooms === Number(housingRooms.value))) {
    rank += 1;
  }
  if (ad.offer.guests && (housingGuests.value === 'any' || ad.offer.guests === Number(housingGuests.value))) {
    rank += 1;
  }
  if (ad.offer.features) {
    housingFeatures.forEach((el) => {
      if (ad.offer.features.some((feature) =>  feature === el.value)) {
        rank += 1;
      }
    });
  }
  //console.log(rank);
  return rank;
}

function compareAds (adA, adB)  {
  const rankA = getAdRank(adA);
  const rankB = getAdRank(adB);

  return rankB - rankA;
}

function sortArrey(data) {
  return data.slice().sort(compareAds);
}


export {sortArrey};
