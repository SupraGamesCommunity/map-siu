export class Icons {
    static _icons = {};

    static get(id) {
        if (Icons._icons[id] === undefined) alert('Unknown icon: ' + id);
        return Icons._icons[id];
    }

    static async init() {
        return Icons._loadIcons();
    }

    static async _loadIcons() {
        return $.get('data/icons.csv', function(csv) {
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
