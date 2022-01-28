import { Layers } from "./layers.js";
import { Icons } from "./icons.js";
import { SiuMarker } from "./siu-marker.js";

export class Markers {
    static async init() {
        return Markers._loadUpgrades()
            .then(Markers._loadGold)
            .then(Markers._loadCollectables)
            .then(Markers._addCoordinateExtractionTool);
    }

    static async _loadUpgrades() {
        $.get('data/upgrades.csv', function(csv) {
            let upgrades = $.csv.toObjects(csv);
            upgrades.forEach(function(upgrade) {
                let icon = 'chest', layer = Layers.itemChest;
                if (upgrade.type === 'chestGold') {icon = 'chestGold';}
                if (upgrade.type === 'shop') {icon = 'shop'; layer = Layers.shop;}
                let popup = upgrade.item;
                if (upgrade.comment) popup += '<br/><i>' + upgrade.comment + '</i>';

                Markers._createMarker(upgrade, icon, layer, upgrade.item, popup, 'upgrades');
                if (upgrade.icon) Markers._createMarker(upgrade, upgrade.icon, Layers.upgrades, upgrade.item, popup, 'upgrades');
            });
        });
    }

    static async _loadGold() {
        $.get('data/gold.csv', function(csv) {
            let coins = $.csv.toObjects(csv);
            coins.forEach(function(coin, index) {
                let icon = 'coin', layer = Layers.coin;
                if (coin.count > 1) icon = 'coinStash';
                if (coin.type === 'pots') icon = 'pots';
                if (coin.type === 'meat') icon = 'meat';
                if (coin.type === 'chest') {icon = 'coinChest'; layer = Layers.coinChest;}
                if (coin.type === 'brick') {icon = 'coinBrick'; layer = Layers.brick;}
                let title = coin.count > 1 ? coin.count + ' Coins' : '1 Coin';
                let popup = title + '&emsp;<small>#' + (index + 2) + '</small>';
                if (coin.comment) popup += '<br/><i>' + coin.comment + '</i>';

                Markers._createMarker(coin, icon, layer, title, popup, 'gold');
            });
        });
    }

    static async _loadCollectables() {
        $.get('data/collectables.csv', function(csv) {
            let collectables = $.csv.toObjects(csv);
            collectables.forEach(function(collectable) {
                Markers._createMarker(collectable, collectable.icon, Layers.collectable, collectable.comment, collectable.comment, 'collectables');
            });
        });
    }

    static async _addCoordinateExtractionTool() {
        L.marker([0, 0], {zIndexOffset: 10000, draggable: true})
            .bindPopup('0, 0')
            .addTo(Layers.coordinate)
            .on('moveend', function(e) {
                let marker = e.target;
                let latlng = marker.getLatLng();
                let x = Math.round(latlng.lng), y = Math.round(-latlng.lat);
                marker.setPopupContent(x + ', ' + y);
                marker.openPopup();
            });
    }

    static _createMarker(data, icon, layer, title, popup, imageFolder) {
        let lat = -parseInt(data.y, 10), lng = parseInt(data.x, 10);
        let marker = new SiuMarker([lat, lng], {icon: Icons.get(icon), title: title})
            .addTo(layer);
        if (imageFolder && data.image) {
            let image = 'img/' + imageFolder + '/' + data.image;
            popup += '<br/><a href="' + image + '" target="_blank"><img width=250 src="' + image + '"/></a>';
        }
        if (data.ytVideo) {let ytSrc = 'https://www.youtube.com/embed/' + data.ytVideo + '?controls=0';
            if (data.ytStart) ytSrc += '&start=' + data.ytStart;
            if (data.ytEnd) ytSrc += '&end=' + data.ytEnd;
            popup += '<br/><iframe width="250" height="140.625" src="' + ytSrc + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        }
        if (popup) marker.bindPopup(popup);
        return marker;
    }
}
