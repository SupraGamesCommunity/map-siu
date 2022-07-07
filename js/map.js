let mapSize = {width: 8192, height: 5500}
let pxTrans = { dx: -73730, dy: -29880, m: 18 }
let mapBounds = [
    [pxTrans.dy, pxTrans.dx],
    [
        pxTrans.dy + pxTrans.m * mapSize.height,
        pxTrans.dx + pxTrans.m * mapSize.width
    ]
];

export var Map = L.Map.extend({
    bounds: mapBounds,
    initialize: function() {
        L.Map.prototype.initialize.call(this, 'map', {
            crs: L.CRS.Simple,
            minZoom: -8,
            maxZoom: -2,
        });
        this.on('contextmenu', function() {/* Do nothing */});
        L.imageOverlay('img/map.jpg', this.bounds).addTo(this);
        this.fitBounds(this.bounds);
    }
});
