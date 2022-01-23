import { SiuMap } from "./siu-map.js";
import { Layers } from "./layers.js";
import { Markers } from "./markers.js";
import { Icons } from "./icons.js";

SiuMap.init()
    .then(Icons.init)
    .then(Layers.init)
    .then(Markers.init);
