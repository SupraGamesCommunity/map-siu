
export var SiuMarker = L.Marker.extend({
    options: {
        found: false
    },

    updateFoundStatus: function() {
        if (this.options.found) {
            this.getElement().classList.add('found');
            this.setZIndexOffset(-10000);
        } else {
            this.getElement().classList.remove('found');
            this.setZIndexOffset(0);
        }
    },

    toggleIcon: function () {
        this.options.found = !this.options.found;
        this.updateFoundStatus();
    }
});

SiuMarker.addInitHook(function() {
    this.on('contextmenu', this.toggleIcon);
});
