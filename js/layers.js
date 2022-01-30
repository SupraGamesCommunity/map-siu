export class Layers {
    static upgrades;
    static shop;
    static itemChest;
    static coinChest;
    static coin;
    static brick;
    static collectable;
    static coordinate;

    static async init(map) {
        Layers.upgrades = L.layerGroup().addTo(map);
        Layers.shop = L.layerGroup();
        Layers.itemChest = L.layerGroup();
        Layers.coinChest = L.layerGroup();
        Layers.coin = L.layerGroup();
        Layers.brick = L.layerGroup();
        Layers.collectable = L.layerGroup().addTo(map);
        Layers.coordinate = L.layerGroup();

        let layers = {
            'Upgrades'     : Layers.upgrades,
            'Shop'         : Layers.shop,
            'Item Chests'  : Layers.itemChest,
            'Coin Chests'  : Layers.coinChest,
            'Coins'        : Layers.coin,
            'Gold Bricks'  : Layers.brick,
            'Collectables' : Layers.collectable,
            'XY'           : Layers.coordinate
        }
        L.control.layers({}, layers, {collapsed: false}).addTo(map);
    }
}
