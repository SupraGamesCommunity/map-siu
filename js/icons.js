export class Icons {
    static _icons = {};

    static get(id) {
        return this._icons[id];
    }

    static init() {
        this._loadIcons();
        window.icons = this._icons;
    }

    static _loadIcons() {
        $.get('data/icons.csv', function(csv) {
            let icons = $.csv.toObjects(csv);
            icons.forEach(function(icon) {
                let id = icon.id;
                let width = parseInt(icon.width, 10), height = parseInt(icon.height, 10);
                let x = parseInt(icon.x, 10), y = parseInt(icon.y, 10);
                if (isNaN(x)) x = width / 2;
                if (isNaN(y)) y = height / 2;
                Icons._icons[id] = L.icon({
                    iconUrl: 'img/icons/' + id + '.png',
                    iconSize: [width, height],
                    iconAnchor: [x, y]
                });
            });
        });
    }
}
