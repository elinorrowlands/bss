import {srtToSbv} from '@matthewscharles/cm-toolbox';
import SyncCC from 'sync-cc';
import MultitouchMapper from '@matthewscharles/multitouch-mapper'
window.syncCC = new SyncCC();

window.srtToSbv = srtToSbv;
window.touch = new MultitouchMapper();