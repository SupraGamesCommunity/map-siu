import { Layers } from "./layers.js";
import { Icons } from "./icons.js";

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
                let lat = -parseInt(upgrade.y, 10), lng = parseInt(upgrade.x);
                let icon = Icons.get('chest'), layer = Layers.itemChest;
                if (upgrade.type === 'chestGold') {icon = Icons.get('chestGold');}
                if (upgrade.type === 'shop') {icon = Icons.get('shop'); layer = Layers.shop;}
                let popup = upgrade.item;
                if (upgrade.comment) popup += '<br/><i>' + upgrade.comment + '</i>';
                if (upgrade.image) {
                    let upgradeImage = 'img/upgrades/' + upgrade.image;
                    popup += '<br/><a href="' + upgradeImage + '" target="_blank"><img width=250 src="' + upgradeImage + '"/></a>';
                }
                if (upgrade.ytToken) {
                    let ytSrc = 'https://www.youtube.com/embed/' + upgrade.ytToken + '?controls=0';
                    if (upgrade.ytStart) ytSrc += '&start=' + upgrade.ytStart;
                    if (upgrade.ytEnd) ytSrc += '&end=' + upgrade.ytEnd;
                    popup += '<br/><iframe width="250" height="140.625" src="' + ytSrc + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
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

    static async _loadGold() {
        $.get('data/gold.csv', function(csv) {
            let coins = $.csv.toObjects(csv);
            coins.forEach(function(coin, index) {
                let lat = -parseInt(coin.y, 10), lng = parseInt(coin.x, 10);
                let icon = Icons.get('coin'), layer = Layers.coin;
                if (coin.count > 1) icon = Icons.get('coinStash');
                if (coin.type === 'chest') {icon = Icons.get('coinChest'); layer = Layers.coinChest;}
                if (coin.type === 'brick') {icon = Icons.get('coinBrick'); layer = Layers.brick;}
                let title = coin.count > 1 ? coin.count + ' Coins' : '1 Coin';
                let popup = title;
                if (coin.comment) popup += '<br/><i>' + coin.comment + '</i>';
                if (coin.image) {
                    let coinImage = 'img/gold/' + coin.image;
                    popup += '<br/><a href="' + coinImage + '" target="_blank"><img width=250 src="' + coinImage + '"/></a>';
                }
                if (coin.ytToken) {
                    let ytSrc = 'https://www.youtube.com/embed/' + coin.ytToken + '?controls=0';
                    if (coin.ytStart) ytSrc += '&start=' + coin.ytStart;
                    if (coin.ytEnd) ytSrc += '&end=' + coin.ytEnd;
                    popup += '<br/><iframe width="250" height="140.625" src="' + ytSrc + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                }
                popup += '&emsp;<small>#' + (index + 2) + '</small>'
                L.marker([lat, lng], {icon: icon, title: title})
                    .bindPopup(popup)
                    .addTo(layer);
            });
        });
    }

    static async _loadCollectables() {
        $.get('data/collectables.csv', function(csv) {
            let collectables = $.csv.toObjects(csv);
            collectables.forEach(function(collectable) {
                let lat = -parseInt(collectable.y, 10), lng = parseInt(collectable.x, 10);
                let icon = Icons.get(collectable.icon);
                let marker = L.marker([lat, lng], {icon: icon, title: collectable.comment})
                    .addTo(Layers.collectable);
                if (collectable.comment || collectable.image || collectable.ytToken) {
                    let popup = collectable.comment;
                    if (collectable.image) {
                        let collectableImage = 'img/collectables/' + collectable.image;
                        popup += '<br/><a href="' + collectableImage + '" target="_blank"><img width=250 src="' + collectableImage + '"/></a>';
                    }
                    if (collectable.ytToken) {
                        let ytSrc = 'https://www.youtube.com/embed/' + collectable.ytToken + '?controls=0';
                        if (collectable.ytStart) ytSrc += '&start=' + collectable.ytStart;
                        if (collectable.ytEnd) ytSrc += '&end=' + collectable.ytEnd;
                        popup += '<br/><iframe width="250" height="140.625" src="' + ytSrc + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                    }
                    marker.bindPopup(popup);
                }
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
}
