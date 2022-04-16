import {getPageActive} from './page-status.js';
//import {createAdsData} from './data.js';
import {createAdPopup} from './similar-ads.js';
import {getDataFromServer} from './network.js';

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

function createMarkers(adsData){
  adsData.forEach((ad) => {
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
