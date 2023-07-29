import {srtToSbv, generateQR} from '@matthewscharles/cm-toolbox';
import SyncCC from 'sync-cc';
import MultitouchMapper from '@matthewscharles/multitouch-mapper'

// this should not be loaded every time

import {mapLoad} from './map_interaction.js';
import {loadingIndicator} from './loading.js';
// import { ScreenInstrument } from '@matthewscharles/screen-instrument';
// window.instrument = new ScreenInstrument();
window.syncCC = new SyncCC();
window.generateQR = generateQR;
window.srtToSbv = srtToSbv;
window.touch = new MultitouchMapper();
window.mapLoad = mapLoad;