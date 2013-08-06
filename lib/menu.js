var menu = {
    view: {},
    form: {},
    dom: {
        "menu": {
            value: 'show',
            type: 'overlay',
            ref: ''
        },
        "init": {
            value: 'show',
            type: 'overlay',
            ref: ''
        },
        "winner": {
            value: 'hide',
            type: 'overlay',
            ref: ''
        },
        "gameover": {
            value: 'hide',
            type: 'overlay',
            ref: ''
        },
        "winner_loose": {
            value: 'hide',
            type: 'overlay',
            ref: ''
        },
        "winner_win": {
            value: 'show',
            type: 'overlay',
            ref: ''
        },
        "menu_winner_name": {
            value: '',
            type: 'text',
            ref: ''
        },
        "menu_winner_pot": {
            value: '',
            type: 'text',
            ref: ''
        },
        "menu_winner_hand": {
            value: '',
            type: 'text',
            ref: ''
        }
    },
    listen: function () {
        var that = this;
        var el = $("#player_name_input");
        el.on('keyup', function () {
            that.on_player_name_keyup(el);
        });

        var el = $("#m_close");
        el.on('click', function () {
            that.on_close_click(el);
        });

        var el = $("#m_start");
        el.on('click', function () {
            that.on_start_click(el);
        });
    },
    init: function () {
        this.view = new View(this.dom);
        this.view.render(this);
        this.listen();
    },
    on_player_name_keyup: function (el) {
        var start_btn = $("#m_start");
        if (el.val() && el.val() != '') {
            start_btn.removeAttr("disabled");
        }
        else {
            start_btn.attr("disabled", "disabled");
        }
    },
    on_close_click: function (el) {
        this.hide();
        game.next();
        game.next();
    },
    on_start_click: function (el) {
        this.hide();
        //game.next();
        game.next();
    },
    render: function () {
        this.view.render(this);
    },
    hide: function (page) {
        this.dom.menu.value = 'hide';
        this.dom.menu.changed = true;
        this.render();
    },
    show: function (page) {
        var page = typeof page === 'undefined' ? 'START' : page;
        this.dom.menu.value = 'show';
        this.dom.menu.changed = true;
        if (page == 'START') {
            this.dom.winner.value = 'hide';
            this.dom.gameover.value = 'hide';
            this.dom.init.value = 'show';
        }
        else if (page == 'WINNER') {
            this.dom.init.value = 'hide';
            this.dom.gameover.value = 'hide';
            this.dom.winner.value = 'show';
            this.dom.menu_winner_pot.value = game.pot;
            this.dom.menu_winner_name.value = game.result.winner;
            if (game.result && game.result.rank.rank_str) {
                this.dom.menu_winner_name.value = game.result.winner;
                this.dom.menu_winner_hand.value = "with" + game.result.rank.rank_str;
                if (game.result.winner == player.name) {
                    this.dom.winner_loose.value = 'hide';
                    this.dom.winner_win.value = 'show';
                }
                else if (game.result.winner == npc.name) {
                    this.dom.winner_loose.value = 'show';
                    this.dom.winner_win.value = 'hide';
                }
                else {
                    log("exception in menu WINNER");
                }
            }
            else {    // hand ended by fold
                this.dom.menu_winner_hand.value = 'FOLD';
            }



            _.each(this.dom, function (s) {
                s.changed = true; // shortcut here
            })


        }
        else if (page == 'GAMEOVER') {
            this.dom.init.value = 'hide';
            this.dom.init.changed = true;
            this.dom.winner.value = 'hide';
            this.dom.winner.changed = true;
            this.dom.gameover.value = 'show';
            this.dom.gameover.changed = true;
        }
        else {
            log("undefined menu page " + page);
        }
        this.render();
    },
    get_form: function () {
        this.form = {
            name: $("#player_name_input").val() || 'Player',
            stack: $("#stack_select").val() || 1000,
            small_blind: $("#small_blind_select").val() || 100,
            cpu: 'CPU'
        };
        return this.form;
    },
    start_game: function () {
        // sets cfg and starts at state PREFLOP
        var cfg = this.get_form();
        if (cfg.name && cfg.name.length > 1) {
            this.dom.menu.changed = true;
            this.dom.menu.value = 'hide';
            this.render();
            main.set_config(cfg);
            main.run();
        }
        else {
            alert("Please enter your name.");
        }

    }
}