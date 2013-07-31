var npc = {
    name: '',
    hand: [],
    stack: 0,
    view: {},
    dom: {
        "n_name": {
            value: '',
            type: 'text',
            ref: 'name'
        },
        "n_stack": {
            value: '',
            type: 'text',
            ref: 'stack'
        },
        "n_card1_img": {
            value: '',
            type: 'card_image',
            ref: ['hand', 0]
        },
        "n_card2_img": {
            value: '',
            type: 'card_image',
            ref: ['hand', 1]
        }
    },
    init: function (name, stack) {
        this.name = name;
        this.stack = stack;
        this.view = new View(this.dom);
        this.view.render();
    },
    pay_blind: function (blind) {
        this.stack = (this.stack - blind < 0) ? 0 : this.stack - blind;
        return blind;
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