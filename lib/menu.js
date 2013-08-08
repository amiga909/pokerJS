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
        "gameover_win": {
            value: 'show',
            type: 'overlay',
            ref: ''
        },
        "gameover_loose": {
            value: 'hide',
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
    on_gameover_click: function (el) {
        window.location.reload(true);  // true: reload from server
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
            this.init_modal();
            this.dom.init.value = 'hide';
            this.dom.gameover.value = 'hide';
            this.dom.winner.value = 'show';
            log("game pot zero?" + game.pot);
            log(game.result)
            this.dom.menu_winner_pot.value = game.result.win;
            this.dom.menu_winner_name.value = game.result.winner;
            if (game.result && game.result.rank.rank_str) {
                this.dom.menu_winner_name.value = game.result.winner;
                this.dom.menu_winner_hand.value = "with " + game.result.rank.rank_str;

            }
            else {    // hand ended by fold
                var folder = game.result.winner == player.name ? npc.name : player.name;
                this.dom.menu_winner_hand.value = "<br>" + folder + ' folded';
            }

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
            _.each(this.dom, function (s) {
                s.changed = true; // shortcut here, complete update
            });
            this.clear_modal();
        }
        else if (page == 'GAMEOVER') {
            this.dom.init.value = 'hide';
            this.dom.winner.value = 'hide';
            this.dom.gameover.value = 'show';
            if(player.stack <= 0 || npc.stack <= 0) {
                this.dom.gameover_win.value = player.stack > 0 ? 'show' : 'hide';
                this.dom.gameover_loose.value = player.stack > 0 ? 'hide' : 'show';
            }
            else {
                log("gameover exception: no winner");
            }
        }
        else {
            log("undefined menu page " + page);
        }
        this.render();
    },
    // if user input is not required:
    init_modal: function () {
        var that = this;
        log("init modal")
        $(document).bind('click', function () {
            log('clickclickclickclickclickclickclickclick')
            that.hide();
        })
    },
    clear_modal: function () {
        $(document).unbind('click');
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