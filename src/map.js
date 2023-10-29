// todo: update to reflect main.js or incorporate mapLoad into main.js

import { srtToSbv, generateQR } from '@matthewscharles/cm-toolbox';
import SyncCC from 'sync-cc';
import MultitouchMapper from '@matthewscharles/multitouch-mapper'

import { mapLoad } from './js/map_interaction.js';
import { loadingIndicator } from './js/loading.js';
import { addButtons } from './js/addButtons.js';

window.syncCC = new SyncCC();
window.generateQR = generateQR;
window.srtToSbv = srtToSbv;
window.touch = new MultitouchMapper();
window.mapLoad = mapLoad;
window.loadingIndicator = loadingIndicator;
window.addButtons = addButtons;