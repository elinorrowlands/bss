import SyncCC from "sync-cc";
import MultitouchMapper from "@matthewscharles/multitouch-mapper";

import CM from "@matthewscharles/cm-toolbox";
import { srtToSbv, generateQR } from "@matthewscharles/cm-toolbox";

import { loadingIndicator } from "./js/loading.js";
import addBackButton from "./js/backButton.js";
import StatusVO from "status-vo";

// using global scope while I work through webpack issues

Object.assign(window,
    {
    cm: CM,
    srtToSbv,
    generateQR,
    syncCC: new SyncCC(),
    touch: new MultitouchMapper(),
    loadingIndicator,
    addBackButton,
    StatusVO
  }
)