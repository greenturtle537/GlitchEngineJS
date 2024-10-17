//This file exists for semantics
import {KeyBehaviour} from "./src/keyBehaviour/keyBehaviour.js";
import {CanvasWindow} from "./src/objectWindows/CanvasWindow.js";
import {GraphicWindow} from "./src/objectWindows/GraphicWindow.js";
import {TextWindow} from "./src/objectWindows/TextWindow.js";
import { LaunchHook } from "./src/launchHook.js";

import { runtimeInject } from "./runtimeInject.js"; runtimeInject.inject();

export { CanvasWindow, GraphicWindow, TextWindow, KeyBehaviour, LaunchHook };
