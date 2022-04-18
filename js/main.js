import  './form.js';

import  './slider.js';
import  './filter.js';

import {getPageInactive} from './page-status.js';
import {createMap, createPinMarker} from './map.js';

getPageInactive ();//куда ее
createMap();//вот где ее лучше вызвать - в main.js по событию загрузки страницы?
createPinMarker();//вот где ее лучше вызвать - в main.js по событию загрузки страницы?
