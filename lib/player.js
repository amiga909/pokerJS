var player = {
    name: '',
    hand: [],
    stack: 0,
    bet: 0,
    is_check_call: 'Call', // false = call
    btn_fold: 'on',
    btn_call: 'on',
    btn_raise: 'on',
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
            ref: 'btn_fold'
        },
        "btn_call_txt": {
            value: 'Check',
            type: 'button_value',
            ref: 'is_check_call'
        },
        "btn_call": {
            value: 'on',
            type: 'button',
            ref: 'btn_call'
        },
        "btn_raise": {
            value: 'on',
            type: 'button',
            ref: 'btn_raise'
        }
    },
    listen: function () {
        $("#btn_fold").click(function () {
            player.on_fold();
        });
        $("#btn_call").click(function () {
            player.on_call();
        });
        $("#btn_raise").click(function () {
            player.on_raise();
        });

        this.listen_slider();

    },
    listen_slider: function () {
        var tooltip = $("#slider_tooltip");
        var btn_raise = $("#btn_raise");
        tooltip.show();

        var slider = $("#slider-vertical").slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: 100,
            value: 0,
            step: 5,
            slide: function (event, ui) {
                tooltip.html(ui.value);
                player.bet = parseInt(ui.value, 10);
                if (player.bet == 0) {
                    btn_raise.attr("disabled", "disabled");
                }
                else {
                    btn_raise.removeAttr("disabled");
                }
                if (player.bet >= slider.slider('option').max) {
                    $("#btn_raise").html("ALL IN");
                }
                else {
                    $("#btn_raise").html("Raise");
                }
            },
            change: function (event, ui) {
                //
                var handle = $(".ui-slider-handle");
                handle.append(tooltip);
                if (parseInt(ui.value, 10) < 0) {
                }
            }
        });
    },
    init: function (name, stack) {
        this.name = name;
        this.stack = stack;
        this.view = new View(this.dom);
        this.view.render(this);
        this.listen();
    },
    pay: function (amt) {
        var amt = parseInt(amt, 10);
        var payment = 0;
        if (_.isNumber(amt) && !_.isNaN(amt) && amt > 0) {
            payment = this.stack - amt < 0 ? this.stack : amt;
            this.stack -= payment;
            game.pot += payment;
        }
        return payment;
    },
    pay_blind: function (blind) {
        return this.pay(blind);
    },
    get_card_ids: function () {
        return this.view.get_card_ids(this.dom);
    },
    on_call: function (price) {
        var price = typeof price === 'undefined' ? 0 : parseInt(price, 10);
        if (price > 0) this.pay(price);
        game.next();
    },
    on_raise: function () {
        var bet = parseInt($("#slider_tooltip").html(), 10);
        this.pay(bet);
        $("#slider-vertical").slider('value', 0);
        $("#slider_tooltip").html(0);
        this.render();
        game.render();
        npc.act(board.cards, bet);
    },
    on_fold: function () {
        // log("on_fold");
        game.fold(this.name);
    },
    render: function () {
        //  log("player render");
        //  log(this.stack);
        //  this.dom.p_stack.value = this.stack; // hack
        $("#slider-vertical").slider('option', {min: 0, max: player.stack});
        this.view.render(player);
    }
}