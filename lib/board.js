var board = {
    cards: [],
    view: {},
    pot: 0,
    state: '',
    dom: {
        "b_card1_img": {
            value: '',
            type: 'card_image',
            ref: ['cards', 0]
        },
        "b_card2_img": {
            value: '',
            type: 'card_image',
            ref: ['cards', 1]
        },
        "b_card3_img": {
            value: '',
            type: 'card_image',
            ref: ['cards', 2]
        },
        "b_card4_img": {
            value: '',
            type: 'card_image',
            ref: ['cards', 3]
        },
        "b_card5_img": {
            value: '',
            type: 'card_image',
            ref: ['cards', 4]
        }
    },
    init: function () {
        this.view = new View(this.dom);
        this.view.render();
    },
    get_card_ids: function () {
        var ids = [];
        _.each(this.dom, function (data, key) {
            if (key.match(/card/)) {
                ids.push(key);
            }
        });
        return ids;
    },
    render: function () {
        var that = this;
        _.each(this.dom, function (data, key) {
            if (data.ref) {
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
        this.view.render();
    }
}