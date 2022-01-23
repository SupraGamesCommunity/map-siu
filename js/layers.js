import { SiuMap } from "./siu-map.js";

export class Layers {
    static upgrades;
    static shop;
    static itemChest;
    static coinChest;
    static coin;
    static brick;
    static collectable;
    static coordinate;

    static init() {
        this.upgrades = L.layerGroup().addTo(SiuMap.map);
        this.shop = L.layerGroup();
        this.itemChest = L.layerGroup();
        this.coinChest = L.layerGroup();
        this.coin = L.layerGroup();
        this.brick = L.layerGroup();
        this.collectable = L.layerGroup().addTo(SiuMap.map);
        this.coordinate = L.layerGroup();

        let layers = {
            'Upgrades'     : this.upgrades,
            'Shop'         : this.shop,
            'Item Chests'  : this.itemChest,
            'Coin Chests'  : this.coinChest,
            'Coins'        : this.coin,
            'Gold Bricks'  : this.brick,
            'Collectables' : this.collectable,
            'XY'           : this.coordinate
        }
        L.control.layers({}, layers, {collapsed: false}).addTo(SiuMap.map);
    }
}
