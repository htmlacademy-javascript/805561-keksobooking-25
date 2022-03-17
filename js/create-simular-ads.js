import {createAdsData} from './data.js';

const mapContainer = document.querySelector('#map-canvas');
const similarAdTemplate = document.querySelector('#card') .content .querySelector('.popup');
const similarAds = createAdsData;
const similarListFragment = document.createDocumentFragment();
const housingType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

similarAds.forEach((ad) => {
  const addElement = similarAdTemplate.cloneNode(true);

  //ad.offer.title ? addElement.querySelector('.popup__title').textContent = ad.offer.title : addElement.querySelector('.popup__title').remove();
  if (ad.offer.title) {
    addElement.querySelector('.popup__title').textContent = ad.offer.title;
  } else {
    addElement.querySelector('.popup__title').remove();
  }

  if (ad.offer.address) {
    addElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  } else {
    addElement.querySelector('.popup__text--address').remove();
  }

  if (ad.offer.price) {
    addElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  } else {
    addElement.querySelector('.popup__text--price').remove();
  }

  if (ad.offer.type) {
    addElement.querySelector('.popup__type').textContent = housingType[ad.offer.type];
  } else {
    addElement.querySelector('.popup__type').remove();
  }

  if (ad.offer.rooms && ad.offer.guests) {
    addElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  } else {
    addElement.querySelector('.popup__text--capacity').remove();
  }

  if (ad.offer.checkin && ad.offer.checkout) {
    addElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  } else {
    addElement.querySelector('.popup__text--time').remove();
  }

  const featuresContainer = addElement.querySelector('.popup__features');
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
    addElement.querySelector('.popup__description').textContent = ad.offer.description;
  } else {
    addElement.querySelector('.popup__description').remove();
  }

  if (ad.offer.photos.length) {
    ad.offer.photos.forEach((photo) => {
      const offerPhotolist = addElement.querySelector('.popup__photos');
      const offerPhoto = addElement.querySelector('.popup__photo').cloneNode(true);
      if (photo) {
        offerPhoto.src = photo;
        offerPhotolist.appendChild(offerPhoto);
      }
    });
    addElement.querySelector('.popup__photo:nth-of-type(1)').remove();// удаляем шаблонный тег img
  } else {
    addElement.querySelector('.popup__photos').remove();
  }

  if (ad.author.avatar) {
    addElement.querySelector('.popup__avatar').src = ad.author.avatar;
  } else {
    addElement.querySelector('.popup__avatar').remove();
  }


  similarListFragment.appendChild(addElement);
});

mapContainer.appendChild(similarListFragment);
