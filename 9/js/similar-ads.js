//import {createAdsData} from './data.js';

//const mapContainer = document.querySelector('#map-canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
//const similarAds = createAdsData;
//const similarListFragment = document.createDocumentFragment();
const housingType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

function createAdPopup (ad){
  const newElement = similarAdTemplate.cloneNode(true);

  if (ad.offer.title) {
    newElement.querySelector('.popup__title').textContent = ad.offer.title;
  } else {
    newElement.querySelector('.popup__title').remove();
  }

  if (ad.offer.address) {
    newElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  } else {
    newElement.querySelector('.popup__text--address').remove();
  }

  if (ad.offer.price) {
    newElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  } else {
    newElement.querySelector('.popup__text--price').remove();
  }

  if (ad.offer.type) {
    newElement.querySelector('.popup__type').textContent = housingType[ad.offer.type];
  } else {
    newElement.querySelector('.popup__type').remove();
  }

  if (ad.offer.rooms && ad.offer.guests) {
    newElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  } else {
    newElement.querySelector('.popup__text--capacity').remove();
  }

  if (ad.offer.checkin && ad.offer.checkout) {
    newElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  } else {
    newElement.querySelector('.popup__text--time').remove();
  }

  const featuresContainer = newElement.querySelector('.popup__features');
  const features = featuresContainer.querySelectorAll('.popup__feature');
  features.forEach((feature) => {
    const isNecessary = ad.offer.features.some(
      (offerfeature) => feature.classList.contains(`popup__feature--${offerfeature}`),
    );
    if (!isNecessary) {
      feature.remove();
    }
  });

  if (ad.offer.description) {
    newElement.querySelector('.popup__description').textContent = ad.offer.description;
  } else {
    newElement.querySelector('.popup__description').remove();
  }

  if (ad.offer.photos.length) {
    ad.offer.photos.forEach((photo) => {
      const offerPhotoList = newElement.querySelector('.popup__photos');
      const offerPhoto = newElement.querySelector('.popup__photo').cloneNode(true);
      if (photo) {
        offerPhoto.src = photo;
        offerPhotoList.appendChild(offerPhoto);
      }
    });
    newElement.querySelector('.popup__photo:nth-of-type(1)').remove();// удаляем шаблонный тег img
  } else {
    newElement.querySelector('.popup__photos').remove();
  }

  if (ad.author.avatar) {
    newElement.querySelector('.popup__avatar').src = ad.author.avatar;
  } else {
    newElement.querySelector('.popup__avatar').remove();
  }
  return newElement;
}

/*function createSimilarAds(){
  similarAds.forEach((ad) => {
    similarListFragment.appendChild(createAd(ad));
  });

  mapContainer.appendChild(similarListFragment);
}*/


export {createAdPopup};
