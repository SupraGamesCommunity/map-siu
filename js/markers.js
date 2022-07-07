import { Layers } from "./layers.js";
import { Icons } from "./icons.js";
import { MapMarker } from "./map-marker.js";

export class Markers {
    static async init() {
        return Markers._loadChests()
            .then(Markers._loadCollectables)
            .then(Markers._loadShops)
            .then(Markers._addCoordinateExtractionTool);
    }

    static async _loadChests() {
        $.get('data/chests.csv', function (csv) {
            let chest = $.csv.toObjects(csv);
            chest.forEach(function (chest) {
                let icon = 'chest', layer = 'closedChest';

                let popup = chest.item;
                if (chest.comment) popup += '<br/><i>' + chest.comment + '</i>';

                Markers._createMarker(chest, icon, layer, chest.item, popup, 'upgrades');
                Markers._createMarker(chest, icon, layer, chest.item, popup, 'collectable');
                Markers._createMarker(chest, icon, layer, chest.item, popup, 'coinChest');
                if (chest.type === 'powerup') Markers._createMarker(chest, chest.icon, 'upgrades', chest.item, popup, 'upgrades')
                if (chest.type === 'collectable') Markers._createMarker(chest, chest.icon, 'misc', chest.item, popup, 'misc')
                if (chest.type === 'coin') Markers._createMarker(chest, chest.icon, 'coinChest', chest.item, popup, 'coinChest')
            });
        });
    }

    static async _loadCollectables() {
        $.get('data/collectables.csv', function (csv) {
            let collectable = $.csv.toObjects(csv);
            collectable.forEach(function (collectable) {
                let popup = collectable.item;
                if (collectable.comment) popup += '<br/><i>' + collectable.comment + '</i>';

                if (collectable.type === 'collectable') Markers._createMarker(collectable, 'question_mark', 'collectable', collectable.item, popup, 'collectable', true)
                if (collectable.type === 'powerup') Markers._createMarker(collectable, 'question_mark', 'collectable', collectable.item, popup, 'collectable', true)

                if (collectable.type === 'grave') Markers._createMarker(collectable, collectable.icon, 'grave', collectable.item, popup, 'grave')
                if (collectable.type === 'collectable') Markers._createMarker(collectable, collectable.icon, 'misc', collectable.item, popup, 'misc')
                if (collectable.type === 'coin') Markers._createMarker(collectable, collectable.icon, 'coin', collectable.item, popup, 'coin')
                if (collectable.type === 'powerup') Markers._createMarker(collectable, collectable.icon, 'upgrades', collectable.item, popup, 'upgrades')
            });
        });
    }

    static async _loadShops() {
        $.get('data/shops.csv', function (csv) {
            let shop = $.csv.toObjects(csv);
            shop.forEach(function (shop) {
                let icon = 'shop', layer = 'shop';

                let popup = shop.item;
                if (shop.comment) popup += '<br/><i>' + shop.comment + '</i>';

                Markers._createMarker(shop, icon, layer, shop.item, popup, 'upgrades');
                if (shop.type === 'powerup') Markers._createMarker(shop, shop.icon, 'upgrades', shop.item, popup, 'upgrades')
            });
        });
    }


    static async _addCoordinateExtractionTool() {
        L.marker([0, 0], {zIndexOffset: 10000, draggable: true})
            .bindPopup('0, 0')
            .addTo(Layers.get('coordinate'))
            .on('moveend', function(e) {
                let marker = e.target;
                let latlng = marker.getLatLng();
                let x = Math.round(latlng.lng), y = Math.round(-latlng.lat);
                marker.setPopupContent(x + ', ' + y);
                marker.openPopup();
            });
    }

    static _createMarker(data, icon, layer, title, popup, imageFolder, spoilerFree) {
        let lat = -parseInt(data.y, 10), lng = parseInt(data.x, 10);
        return new MapMarker([lat, lng], {icon: Icons.get(icon), title: title, spoilerFree: spoilerFree})
            .addTo(Layers.get(layer))
            .setPopupText(popup)
            .setPopupImage(imageFolder, data.image)
            .setPopupYouTube(data.ytVideo, data.ytStart, data.ytEnd);
    }
}
