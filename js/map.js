import {getPageActive, getFilterActive} from './page-status.js';
import {createAdPopup} from './similar-ads.js';
import {getDataFromServer} from './network.js';
import {debounce, errorMessage} from './util.js';
import {filterArray} from './filter.js';

const SIMILAR_AD_COUNT = 10;
const LATITUDE_INITIAL = 35.6895;
const LONGITUDE_INITIAL = 139.692;
const RERENDER_DELAY = 500;
const MAP_SCALE = 12;


const adressFieldElement = document.querySelector('#address');

let map;
let markerGroup;
function createMap(){
  map = L.map('map-canvas')
    .on('load', () => {
      getDataFromServer(onAdsLoad, errorMessage);
      getPageActive();
      adressFieldElement.value = `широта: ${  LATITUDE_INITIAL  }, долгота: ${  LONGITUDE_INITIAL}`;
    })
    .setView({
      lat: LATITUDE_INITIAL,
      lng: LONGITUDE_INITIAL,
    }, MAP_SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);
  markerGroup = L.layerGroup().addTo(map);

}


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
    adressFieldElement.value = `широта: ${  latitude  }, долгота: ${  longitude}`;
  });
}

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


function createMarkers(adsData){
  adsData
    .slice(0, SIMILAR_AD_COUNT)
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
        .addTo(markerGroup)
        .bindPopup(createAdPopup(ad));
    });
}

function clearMarkers() {
  markerGroup.clearLayers();
}

let adsArray = [];

function reRender() {
  clearMarkers();
  createMarkers(adsArray);
}

function renderAds(data) {
  createMarkers(data);
  getFilterActive();
}

const filterFormElement = document.querySelector('.map__filters');

function onAdsLoad(data) {
  adsArray = data;
  renderAds(data);
  const debounceFunction = debounce(onFilterChange, RERENDER_DELAY);
  function onFilterChange(evt) {
    const target = evt.target;
    if (target.tagName !== 'INPUT' && target.tagName !== 'SELECT' ) {return;}
    clearMarkers();
    createMarkers(filterArray(data));
  }
  filterFormElement.addEventListener('change', debounceFunction);
}


function mapReset(){
  mainPinMarker.setLatLng({
    lat: LATITUDE_INITIAL,
    lng: LONGITUDE_INITIAL,
  });
  map.setView({
    lat: LATITUDE_INITIAL,
    lng: LONGITUDE_INITIAL,
  }, MAP_SCALE);

  const lefletPopup = document.querySelector ('.leaflet-popup');
  if(lefletPopup){
    lefletPopup.remove();
  }
  adressFieldElement.value = `широта: ${  LATITUDE_INITIAL  }, долгота: ${  LONGITUDE_INITIAL}`;
}

export {mapReset, clearMarkers, createMarkers, createMap, reRender, createPinMarker};
