import {getPageActive} from './page-status.js';
import {createAdsData} from './data.js';
import {createAdPopup} from './similar-ads.js';

const LATITUDE_INITIAL = 35.6895;
const LONGITUDE_INITIAL = 139.692;
const adressField = document.querySelector('#address');
const map = L.map('map-canvas')
  .on('load', () => {
    getPageActive();
    adressField.value = `широта: ${  LATITUDE_INITIAL  }, долгота: ${  LONGITUDE_INITIAL}`;
    //console.log('Карта инициализирована');
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

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
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

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

createAdsData.forEach((ad) => {
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
