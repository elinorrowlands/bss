import {srtToSbv, generateQR} from '@matthewscharles/cm-toolbox';
import SyncCC from 'sync-cc';
import MultitouchMapper from '@matthewscharles/multitouch-mapper'
window.syncCC = new SyncCC();
window.generateQR = generateQR;
window.srtToSbv = srtToSbv;
window.touch = new MultitouchMapper();