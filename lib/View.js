function View(obj) {
    this.obj = obj;
    _.each(this.obj, function (v, key) {
        v.changed = true;
    });
    this.render = function (obj) {
        this.obj = typeof new_obj === 'undefined' ? this.obj : obj.css;
        _.each(this.obj, function (v, key) {
            if (v.changed) {
                var el = $("#" + key);
                if (typeof el !== 'undefined') {
                    if (v.type == 'text') {
                        el.html(v.value);
                    } else if (v.type == 'card_image') {
                       if(v.value.length > 0) el.attr('src', 'img/' + v.value + '.png');
                    } else if (v.type == 'button') {
                        if (v.value == 'off') {
                            el.attr("disabled", "disabled");
                        } else if (v.value == 'on') {
                            el.removeAttr("disabled");
                        }
                        // register button handlers
                        if(v.ref && typeof v.ref === 'function') {
                            v.ref.call(this, key);
                        }
                    } else {
                        log("invalid type in viewer:" + v.type);
                    }
                    v.changed = false;
                } else {
                    log("invalid css id in viewer:" + key);
                }
            }
        });
    };
    // unfoldCards: animates unfolding cards
    // arg cards: array of dom IDs
    this.unfoldCards = function (cards) {
        _.each(cards, function (c, index) {
            c = c.replace(/_img/, '');
            var card;
            card = $("#" + c);
            card.show();
            setTimeout(function () {
                card.addClass("flipped");
            }, index * 100);
        });
    };
}