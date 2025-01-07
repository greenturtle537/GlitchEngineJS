//This file exists for semantics
import {KeyBehaviour} from "./src/keyBehaviour/keyBehaviour.js";
import {CanvasWindow} from "./src/objectWindows/CanvasWindow.js";
import {GraphicWindow} from "./src/objectWindows/GraphicWindow.js";
import {TextWindow} from "./src/objectWindows/TextWindow.js";
import {LaunchHook} from "./src/LaunchHook.js";

import { runtimeInject } from "./runtimeInject.js";
import { createElementNS, createCanvasElement } from "./src/utils.js";

export { CanvasWindow, GraphicWindow, TextWindow, KeyBehaviour, LaunchHook, runtimeInject, createCanvasElement, createElementNS };