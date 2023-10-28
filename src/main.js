import * as Tone from "tone";
import SyncCC from "sync-cc";
import MultitouchMapper from "@matthewscharles/multitouch-mapper";
import $ from "jquery";

import CM from "@matthewscharles/cm-toolbox";
import { srtToSbv, generateQR } from "@matthewscharles/cm-toolbox";

import { replaceSvgAll } from "./js/replaceSvg.js";
import { loadingIndicator } from "./js/loading.js";
import assignClasses from "./js/assignClasses.js";
import addBackButton from "./js/backButton.js";
import assignStartButton from "./js/assignStartButton.js";
import StatusVO from "status-vo";

// using global scope while I work through webpack issues

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
    addBackButton,
    StatusVO
  }
)

window.addEventListener('load', ()=>{
  replaceSvgAll();
  loadingIndicator.init();
  addBackButton();
  assignStartButton();
});