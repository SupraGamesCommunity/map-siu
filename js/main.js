import { Map } from "./map.js";
import { Layers } from "./layers.js";
import { Markers } from "./markers.js";
import { Icons } from "./icons.js";

let map = new Map();

Layers.init(map)
    .then(Icons.init)
    .then(Markers.init);
