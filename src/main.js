import {srtToSbv, generateQR} from '@matthewscharles/cm-toolbox';
import SyncCC from 'sync-cc';
import MultitouchMapper from '@matthewscharles/multitouch-mapper';
import CM from '@matthewscharles/cm-toolbox';
window.cm = CM;

import {loadingIndicator} from './loading.js';

window.syncCC = new SyncCC();
window.generateQR = generateQR;
window.srtToSbv = srtToSbv;
window.touch = new MultitouchMapper();


