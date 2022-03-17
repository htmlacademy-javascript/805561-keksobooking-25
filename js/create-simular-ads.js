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

  addElement.querySelector('.popup__title').textContent = ad.offer.title;
  // ad.offer.title ? addElement.querySelector('.popup__title').remove() : addElement.querySelector('.popup__title').textContent = ad.offer.title;
  addElement.querySelector('.popup__text--address').stextContent = ad.offer.address;
  addElement.querySelector('.popup__text--price').textContent = `${ ad.offer.price} ₽/ночь`;
  addElement.querySelector('.popup__type').textContent = housingType[ad.offer.type];
  addElement.querySelector('.popup__text--capacity').textContent = `${ ad.offer.rooms} комнаты для ${ ad.offer.guests  } гостей`;
  addElement.querySelector('.popup__text--time').textContent = `Заезд после ${ ad.offer.checkin }, выезд до ${ ad.offer.checkout}`;

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

  addElement.querySelector('.popup__description').textContent = ad.offer.description;

  ad.offer.photos.forEach((photo) => {
    const offerPhotolist = addElement.querySelector('.popup__photos');
    const offerPhoto = addElement.querySelector('.popup__photo').cloneNode(true);
    if(photo){
      offerPhoto.src = photo;
      offerPhotolist.appendChild(offerPhoto);
    }
  });
  addElement.querySelector('.popup__photo:nth-of-type(1)').remove();// удаляем шаблонный тег img

  addElement.querySelector('.popup__avatar').src = ad.author.avatar;

  similarListFragment.appendChild(addElement);
});

mapContainer.appendChild(similarListFragment);
