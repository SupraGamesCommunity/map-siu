export var SiuMarker = L.Marker.extend({
    options: {
        found: false,
        popupText: null,
        popupImage: null,
        popupYouTube: null
    },

    initialize: function() {
        L.Marker.prototype.initialize.apply(this, arguments);

        this.on('contextmenu', this._toggleIcon);
        this.bindPopup(() => this._generatePopup());
    },

    onAdd: function() {
        L.Marker.prototype.onAdd.apply(this, arguments);
        this.updateFoundStatus();
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

    setPopupText: function (text) {
        this.options.popupText = text;
        return this;
    },

    setPopupImage: function (folder, image) {
        if (folder && image) {
            let imgSrc = 'img/' + folder + '/' + image;
            this.options.popupImage = '<a href="' + imgSrc + '" target="_blank"><img width=250 src="' + imgSrc + '" alt/></a>';
        } else {
            this.options.popupImage = null;
        }
        return this;
    },

    setPopupYouTube: function(id, start, end) {
        if (id) {
            let ytSrc = 'https://www.youtube.com/embed/' + id + '?controls=0';
            if (start) ytSrc += '&start=' + start;
            if (end) ytSrc += '&end=' + end;
            this.options.popupYouTube = '<iframe width="250" height="140.625" src="' + ytSrc + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        } else {
            this.options.popupYouTube = null;
        }
        return this;
    },

    _toggleIcon: function() {
        this.options.found = !this.options.found;
        this.updateFoundStatus();
    },

    _generatePopup: function() {
        return [
            this.options.popupText,
            this.options.popupImage,
            this.options.popupYouTube
        ].filter(Boolean).join('<br/>');
    }
});
