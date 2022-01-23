import { Layers } from "./layers.js";
import { Icons } from "./icons.js";

export class Markers {
    static init() {
        this._loadUpgrades();
        this._loadGold();
        this._loadTrophies();
        this._addCoordinateExtractionTool();
    }

    static _loadUpgrades() {
        $.get('data/upgrades.csv', function(csv) {
            var upgrades = $.csv.toObjects(csv);
            upgrades.forEach(function(upgrade) {
                var lat = -parseInt(upgrade.y, 10), lng = parseInt(upgrade.x);
                var icon = Icons.get('chest'), layer = Layers.itemChest;
                if (upgrade.type === 'chestGold') {icon = Icons.get('chestGold');}
                if (upgrade.type === 'shop') {icon = Icons.get('shop'); layer = Layers.shop;}
                var popup = upgrade.item;
                if (upgrade.comment) popup += '<br/><i>' + upgrade.comment + '</i>';
                if (upgrade.image) {
                    var upgradeImage = 'img/upgrades/' + upgrade.image;
                    popup += '<br/><a href="' + upgradeImage + '" target="_blank"><img width=100 src="' + upgradeImage + '"/></a>';
                }
                L.marker([lat, lng], {icon: icon, title: upgrade.item})
                    .bindPopup(popup)
                    .addTo(layer);
            });
        });
    }

    static _loadGold() {
        $.get('data/gold.csv', function(csv) {
            var coins = $.csv.toObjects(csv);
            coins.forEach(function(coin, index) {
                var lat = -parseInt(coin.y, 10), lng = parseInt(coin.x, 10);
                var icon = Icons.get('coin'), layer = Layers.coin;
                if (coin.count > 1) icon = Icons.get('coinStash');
                if (coin.type === 'chest') {icon = Icons.get('chest'); layer = Layers.coinChest;}
                if (coin.type === 'brick') {icon = Icons.get('coinBrick'); layer = Layers.brick;}
                var title = coin.count > 1 ? coin.count + ' Coins' : '1 Coin';
                var popup = title;
                if (coin.comment) popup += '<br/><i>' + coin.comment + '</i>';
                if (coin.image) {
                    var coinImage = 'img/gold/' + coin.image;
                    popup += '<br/><a href="' + coinImage + '" target="_blank"><img width=100 src="' + coinImage + '"/></a>';
                }
                popup += '&emsp;<small>#' + (index + 2) + '</small>'
                L.marker([lat, lng], {icon: icon, title: title})
                    .bindPopup(popup)
                    .addTo(layer);
            });
        });
    }

    static _loadTrophies() {
        $.get('data/trophies.csv', function(csv) {
            var trophies = $.csv.toObjects(csv);
            trophies.forEach(function(trophy) {
                var lat = -parseInt(trophy.y, 10), lng = parseInt(trophy.x, 10);
                var popup = trophy.comment;
                if (trophy.image) {
                    var trophyImage = 'img/trophies/' + trophy.image;
                    popup += '<br/><a href="' + trophyImage + '" target="_blank"><img width=100 src="' + trophyImage + '"/></a>';
                }
                L.marker([lat, lng], {icon: Icons.get('trophy'), title: trophy.comment})
                    .bindPopup(popup)
                    .addTo(Layers.trophy);
            });
        });
    }

    static _addCoordinateExtractionTool() {
        L.marker([0, 0], {zIndexOffset: 10000, draggable: true})
            .bindPopup('0, 0')
            .addTo(Layers.coordinate)
            .on('moveend', function(e) {
                var marker = e.target;
                var latlng = marker.getLatLng();
                var x = Math.round(latlng.lng), y = Math.round(-latlng.lat);
                marker.setPopupContent(x + ', ' + y);
                marker.openPopup();
            });
    }
}
