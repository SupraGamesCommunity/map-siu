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
            let upgrades = $.csv.toObjects(csv);
            upgrades.forEach(function(upgrade) {
                let lat = -parseInt(upgrade.y, 10), lng = parseInt(upgrade.x);
                let icon = Icons.get('chest'), layer = Layers.itemChest;
                if (upgrade.type === 'chestGold') {icon = Icons.get('chestGold');}
                if (upgrade.type === 'shop') {icon = Icons.get('shop'); layer = Layers.shop;}
                let popup = upgrade.item;
                if (upgrade.comment) popup += '<br/><i>' + upgrade.comment + '</i>';
                if (upgrade.image) {
                    let upgradeImage = 'img/upgrades/' + upgrade.image;
                    popup += '<br/><a href="' + upgradeImage + '" target="_blank"><img width=100 src="' + upgradeImage + '"/></a>';
                }
                L.marker([lat, lng], {icon: icon, title: upgrade.item})
                    .bindPopup(popup)
                    .addTo(layer);

                // For now, if icon is set add it to additional layer
                if (upgrade.icon) {
                    icon = Icons.get(upgrade.icon);
                    layer = Layers.upgrades;

                    L.marker([lat, lng], {icon: icon, title: upgrade.item})
                        .bindPopup(popup)
                        .addTo(layer);
                }
            });
        });
    }

    static _loadGold() {
        $.get('data/gold.csv', function(csv) {
            let coins = $.csv.toObjects(csv);
            coins.forEach(function(coin, index) {
                let lat = -parseInt(coin.y, 10), lng = parseInt(coin.x, 10);
                let icon = Icons.get('coin'), layer = Layers.coin;
                if (coin.count > 1) icon = Icons.get('coinStash');
                if (coin.type === 'chest') {icon = Icons.get('chest'); layer = Layers.coinChest;}
                if (coin.type === 'brick') {icon = Icons.get('coinBrick'); layer = Layers.brick;}
                let title = coin.count > 1 ? coin.count + ' Coins' : '1 Coin';
                let popup = title;
                if (coin.comment) popup += '<br/><i>' + coin.comment + '</i>';
                if (coin.image) {
                    let coinImage = 'img/gold/' + coin.image;
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
            let trophies = $.csv.toObjects(csv);
            trophies.forEach(function(trophy) {
                let lat = -parseInt(trophy.y, 10), lng = parseInt(trophy.x, 10);
                let popup = trophy.comment;
                if (trophy.image) {
                    let trophyImage = 'img/trophies/' + trophy.image;
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
                let marker = e.target;
                let latlng = marker.getLatLng();
                let x = Math.round(latlng.lng), y = Math.round(-latlng.lat);
                marker.setPopupContent(x + ', ' + y);
                marker.openPopup();
            });
    }
}
