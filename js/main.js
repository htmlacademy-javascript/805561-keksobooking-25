import  './form.js';
import  './slider.js';
import  './filter.js';
import  './foto-load.js';

import {getPageInactive} from './page-status.js';
import {createMap, createPinMarker} from './map.js';

getPageInactive ();
createMap();
createPinMarker();
