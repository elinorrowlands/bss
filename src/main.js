import { srtToSbv, generateQR } from "@matthewscharles/cm-toolbox";
import SyncCC from "sync-cc";
import MultitouchMapper from "@matthewscharles/multitouch-mapper";
import CM from "@matthewscharles/cm-toolbox";
import { loadingIndicator } from "./js/loading.js";
import addBackButton from "./js/backButton.js";
import StatusVO from "status-vo";

window.cm = CM;
window.syncCC = new SyncCC();
window.generateQR = generateQR;
window.srtToSbv = srtToSbv;
window.touch = new MultitouchMapper();
window.loadingIndicator = loadingIndicator;
window.addBackButton = addBackButton;
window.StatusVO = StatusVO;
