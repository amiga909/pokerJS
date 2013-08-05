function View(obj) {
    this.obj = obj;
    _.each(this.obj, function (v, key) {
        v.changed = true;
    });
    this.render = function (that) {
        _.each(that.dom, function (data, key) {
            if (data.ref) {
                //if(data.ref == 'stack') log(that.dom);
                var val = that[data.ref];
                if (_.isArray(data.ref)) {
                    val = that[data.ref[0]][data.ref[1]];
                }
                if (typeof val !== 'undefined' && that.dom[key].value != val) {
                    that.dom[key].value = val;
                    that.dom[key].changed = true;
                }
            }
        });

        _.each(this.obj, function (v, key) {
            if (v.changed) {
                var el = $("#" + key);
                if (typeof el !== 'undefined') {
                    if (v.type == 'text') {
                        el.html(v.value);
                    } else if (v.type == 'button_value') {
                        el.val(v.value);
                    }
                    else if (v.type == 'card_image') {
                        if (v.value.length > 0) el.attr('src', 'img/' + v.value + '.png');
                    } else if (v.type == 'button') {
                        if (v.value == 'off') {
                            el.attr("disabled", "disabled");
                        } else if (v.value == 'on') {
                            el.removeAttr("disabled");
                        }
                        if (v.ref && typeof v.ref === 'function') {
                            v.ref.call(this, key);
                        }
                    } else if (v.type == 'slider') {
                        if (v.ref && typeof v.ref === 'function') {
                            v.ref.call(this, key);
                        }
                    } else if (v.type == 'function') {
                        if (v.ref && typeof v.ref === 'function') {
                            v.ref.call(this, key);
                        }
                    }

                    else if (v.type == 'overlay') {
                        if (v.value == 'hide') {
                            el.hide();
                        }
                        else if (v.value == 'show') {
                            el.show();
                        }
                    }
                    else {
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
    this.get_card_ids = function (dom) {
        var ids = [];
        _.each(dom, function (data, key) {
            if (key.match(/card/)) {
                ids.push(key);
            }
        });
        return ids;
    };
}