import { SiuMap } from "./siu-map.js";

export class Layers {
    static shop;
    static itemChest;
    static coinChest;
    static coin;
    static brick;
    static trophy;
    static coordinate;

    static init() {
        this.shop = L.layerGroup().addTo(SiuMap.map);
        this.itemChest = L.layerGroup().addTo(SiuMap.map);
        this.coinChest = L.layerGroup().addTo(SiuMap.map);
        this.coin = L.layerGroup().addTo(SiuMap.map);
        this.brick = L.layerGroup().addTo(SiuMap.map);
        this.trophy = L.layerGroup().addTo(SiuMap.map);
        this.coordinate = L.layerGroup();

        let layers = {
            'Shop'        : this.shop,
            'Item Chests' : this.itemChest,
            'Coin Chests' : this.coinChest,
            'Coins'       : this.coin,
            'Gold Bricks' : this.brick,
            'Trophies'    : this.trophy,
            'XY'          : this.coordinate
        }
        L.control.layers({}, layers, {collapsed: false}).addTo(SiuMap.map);
    }
}
