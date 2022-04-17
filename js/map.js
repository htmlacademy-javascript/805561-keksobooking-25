import {getPageActive} from './page-status.js';
//import {createAdsData} from './data.js';
import {createAdPopup} from './similar-ads.js';
import {getDataFromServer} from './network.js';
const SIMILAR_AD_COUNT = 10;
const LATITUDE_INITIAL = 35.6895;
const LONGITUDE_INITIAL = 139.692;
const adressField = document.querySelector('#address');

let map;
function createMap(){
  map = L.map('map-canvas')
    .on('load', () => {
      getPageActive();
      //console.log('Карта инициализирована1');
      getDataFromServer(createMarkers, errorMessage);
      adressField.value = `широта: ${  LATITUDE_INITIAL  }, долгота: ${  LONGITUDE_INITIAL}`;

    })
    .setView({
      lat: LATITUDE_INITIAL,
      lng: LONGITUDE_INITIAL,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);
}
createMap();//вот где ее лучше вызвать - в main.js по событию загрузки страницы?

let mainPinMarker;
function createPinMarker() {
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  mainPinMarker = L.marker(
    {
      lat: LATITUDE_INITIAL,
      lng: LONGITUDE_INITIAL,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  const numberSymbols = 5;
  mainPinMarker.on('moveend', (evt) => {
    const latitude =  evt.target.getLatLng().lat.toFixed(numberSymbols);
    const longitude = evt.target.getLatLng().lng.toFixed(numberSymbols);
    adressField.value = `широта: ${  latitude  }, долгота: ${  longitude}`;
    //console.log(evt.target.getLatLng());
  });
}
createPinMarker();//вот где ее лучше вызвать - в main.js по событию загрузки страницы?

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

///////////////////////////////////////////////////////////////////////////////
const prise = {
  any: [0, 100000],
  low: [0, 9999],
  middle: [10000, 50000],
  high: [50001, 100000]
};
//функция для определения, входит ли число в заданный интервал
function isNumberIntervalIncluded (min, max, number) {
  return number < max && number > min;
}

const filterForm = document.querySelector('.map__filters');
const housingType = filterForm.querySelector('#housing-type');
const housingPrice = filterForm.querySelector('#housing-price');
const housingRooms = filterForm.querySelector('#housing-rooms');
const housingGuests = filterForm.querySelector('#housing-guests');
const housingFeatures = filterForm.querySelectorAll('[name="features"]:checked');


const getAdRank = (ad) => {
  let rank = 0;

  if (ad.offer.type && (housingType.value === 'any' || ad.offer.type === Number(housingType.value))) {
    rank += 10;
    //console.log(`rank${  rank}`);
  }
  if (ad.offer.price && isNumberIntervalIncluded(...prise[housingPrice.value], ad.offer.price)) {
    rank += 9;
    //console.log(rank);
    //console.log('тыдыщ!');
  }
  if (ad.offer.rooms && (housingRooms.value === 'any' || ad.offer.rooms === Number(housingRooms.value))) {
    rank += 8;
  }
  if (ad.offer.guests && (housingGuests.value === 'any' || ad.offer.guests === Number(housingGuests.value))) {
    rank += 7;
  }
  if (ad.offer.features) {
    housingFeatures.forEach((el) => {
      if (ad.offer.features.some((feature) =>  feature === el.value)) {
        rank += 1;
      }
    });
  }

  console.log(rank);
  return rank;
};

const compareAds = (adA, adB) => {
  const rankA = getAdRank(adA);
  const rankB = getAdRank(adB);

  return rankB - rankA;
};

//сделать функцию, в которой будет вызываться сначала создание похожих объявлений(маркеров) createMarkers,
// и только потом функция "разблокировать форму фильтра", и эту общую передать в getDataFromServer вместо createMarkers

function createMarkers(adsData){
  adsData
    .slice(0, SIMILAR_AD_COUNT)
    .sort(compareAds)
    .forEach((ad) => {
      const {location:{lat, lng}} = ad;
      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon,
        },
      );
      marker
        .addTo(map)
        .bindPopup(createAdPopup(ad));
    });
  /*adsData.forEach((ad) => {
    getAdRank(ad);
  });*/
}

//показать сообщение об ошибке (сваять) , если при загрузке данных с сервера произошла ошибка запроса
const ALERT_SHOW_TIME = 7000;
function errorMessage  () {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'fixed';
  alertContainer.style.width = '500px';
  alertContainer.style.top = '100px';
  alertContainer.style.left = '50%';
  alertContainer.style.transform = 'translateX(-50%)';
  alertContainer.style.padding = '50px 30px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.lineHeight = '26px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#fff';
  alertContainer.style.borderRadius = '10px';

  alertContainer.textContent = 'При загрузке данных с сервера произошла ошибка, но вы можете опубликовать свое объявление :)';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

// возврат карты в исходное состояние с закрытием балуна,ой, перемудрила я..
function mapReset(){
  //перемещение метки в исходную точку по клику
  mainPinMarker.setLatLng({
    lat: LATITUDE_INITIAL,
    lng: LONGITUDE_INITIAL,
  });
  //возвращение к начальным значениям масштаба и центра карты.
  map.setView({
    lat: LATITUDE_INITIAL,
    lng: LONGITUDE_INITIAL,
  }, 12);
  //закрываем открытый балун, если он есть
  const lefletPopup = document.querySelector ('.leaflet-popup');
  if(lefletPopup){
    lefletPopup.remove();
  }
  adressField.value = `широта: ${  LATITUDE_INITIAL  }, долгота: ${  LONGITUDE_INITIAL}`;
  //console.log('карта приведена в исходный вид');
}

export {mapReset};
