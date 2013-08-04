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
            value: 'show',
            type: 'overlay',
            ref: ''
        },
        "gameover": {
            value: 'show',
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
        "m_start": {
            value: 'on',
            type: 'button',
            ref: function (id) {
                $("#" + id).click(function () {
                    menu.start_game();
                });
            }
        },
        "m_close": {
            value: 'on',
            type: 'button',
            ref: function (id) {
                $("#" + id).click(function () {
                    menu.hide();
                });
            }
        }
    },
    init: function () {
        this.view = new View(this.dom);
        this.view.render(this);
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
            this.dom.winner.changed = true;
            this.dom.gameover.value = 'hide';
            this.dom.gameover.changed = true;
            this.dom.init.value = 'show';
            this.dom.init.changed = true;
        }
        else if (page == 'WINNER') {
            this.dom.init.value = 'hide';
            this.dom.init.changed = true;
            this.dom.gameover.value = 'hide';
            this.dom.gameover.changed = true;
            this.dom.winner.value = 'show';
            this.dom.winner.changed = true;
            this.dom.menu_winner_pot.value = game.pot;
            this.dom.menu_winner_pot.changed = true;
            this.dom.winner_loose.changed = true;
            this.dom.winner_win.changed = true;
            this.dom.menu_winner_name.changed = true;
            if (game.winner == player.name) {
                this.dom.winner_loose.value = 'hide';
                this.dom.winner_win.value = 'show';
            }
            else if (game.winner == npc.name) {
                this.dom.winner_loose.value = 'show';
                this.dom.winner_win.value = 'hide';
            }
            else {
                log("exception in menu WINNER");
            }
            // "winner_loose": winner_win  menu_winner_name   menu_winner_pot

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