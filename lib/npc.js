var npc = {
    name: '',
    hand: [],
    stack: 0,
    stake: 0, // money spent in one round
    action: '',
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
        "n_action": {
            value: '',
            type: 'text',
            ref: 'action'
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
        this.view.render(this);
    },
    act: function (board, bet) {
        log("npc acts  bet:" + bet);
        var bet = (_.isNumber(bet) && !_.isNaN(bet)) ? bet : 0;
        this.best = evaluator.run(board.concat(this.hand));
        if (bet > 20) {
            log("bet > 20 nc folds");
            this.on_fold();
        }
        else if (bet == 0) {
            this.on_check();
        }
        else {
            this.on_call(bet);
        }
        this.render();
    },
    pay: function (amt) {
        var amt = parseInt(amt, 10);
        var payment = 0;
        if (_.isNumber(amt) && !_.isNaN(amt) && amt > 0) {
            payment = this.stack - amt < 0 ? this.stack : amt;
            this.stack -= payment;
            this.stake += payment;
            game.pot += payment;
        }
        return payment;
    },
    pay_blind: function (blind) {
        return this.pay(blind);
    },
    on_call: function (price) {
        log("npc calls");
        this.action = 'call';
        var price = typeof price === 'undefined' ? 0 : parseInt(price, 10);
        if (price > 0) this.pay(price);
        game.next();
    },
    on_raise: function () {
        this.action = 'raise';
    },
    on_fold: function () {
        log("npc folds");
        this.action = 'fold';
        game.fold(this.name);
    },
    on_check: function () {
        this.action = 'check';
    },
    get_card_ids: function () {
        return this.view.get_card_ids(this.dom);
    },
    render: function () {
        this.view.render(this);
    }
}