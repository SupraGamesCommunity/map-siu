export class Layers {
    static _layers = {};

    static get(id) {
        if (Layers._layers[id] === undefined) alert('Unknown layer: ' + id);
        return Layers._layers[id];
    }

    static async init(map) {
        return $.get('data/layers.csv', function(csv) {
            let layerMap = {};
            let layers = $.csv.toObjects(csv);
            layers.forEach(function(layer) {
                let layerObj = L.layerGroup();
                if (layer.defaultActive) layerObj.addTo(map);
                layerMap[layer.name] = layerObj;
                Layers._layers[layer.id] = layerObj;
            });
            L.control.layers({}, layerMap, {collapsed: false}).addTo(map);
        });
    }
}
