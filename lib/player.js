var player = {
    name: '',
    hand: [],
    stack: 0,
    view: {},
    dom: {
        "p_name": {
            value: '',
            type: 'text',
            ref: 'name'
        },
        "p_stack": {
            value: '',
            type: 'text',
            ref: 'stack'
        },
        "p_card1_img": {
            value: '',
            type: 'card_image',
            ref: ['hand', 0]
        },
        "p_card2_img": {
            value: '',
            type: 'card_image',
            ref: ['hand', 1]
        },
        "btn_fold": {
            value: 'on',
            type: 'button',
            ref: function (id) {
                $("#" + id).click(function () {
                    player.on_fold();
                })
            }
        },
        "btn_call": {
            value: 'on',
            type: 'button',
            ref: function (id) {
                $("#" + id).click(function () {
                    player.on_call();
                })
            }
        },
        "btn_raise": {
            value: 'on',
            type: 'button',
            ref: function (id) {
                $("#" + id).click(function () {
                    player.on_raise();
                })
            }
        }
    },
    init: function (name, stack) {
        var that = this;
        this.name = name;
        this.stack = stack;
        this.view = new View(this.dom);
        this.view.render();
    },
    listen: function () {
        /*
         * var stop = $('#btn_stop'); var start =
         * document.getElementById('btn_start'); stop.on('click', function() { //
         * onStop.call(); // var int=window.clearInterval(int); })
         */
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
    on_call: function () {
        game.next();
    },

    on_raise: function () {
        log("on_raise");
    },

    on_fold: function () {
        log("on_fold");
        game.end("npc");
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