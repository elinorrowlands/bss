import * as Tone from "tone";
import SyncCC from "sync-cc";
import { MultitouchMapper } from "@matthewscharles/multitouch-mapper";
import $ from "jquery";

import CM from "@matthewscharles/cm-toolbox";
import { srtToSbv, generateQR } from "@matthewscharles/cm-toolbox";

import { replaceSvgAll } from "./js/replaceSvg.js";
import { loadingIndicator } from "./js/loading.js";
import { addButtons } from "./js/addButtons.js";
import assignClasses from "./js/assignClasses.js";
import assignStartButton from "./js/assignStartButton.js";
import StatusVO from "status-vo";

Object.assign(window,
  {
    $,
    Tone,
    cm: CM,
    srtToSbv,
    generateQR,
    syncCC: new SyncCC(),
    touch: new MultitouchMapper(),
    loadingIndicator,
    assignClasses,
    addButtons,
    StatusVO
  }
)

window.addEventListener('load', ()=>{
  replaceSvgAll();
  loadingIndicator.init();
  addButtons();
  assignStartButton();
});