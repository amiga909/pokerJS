var game = {
    states: ['ANTE', 'PREFLOP', 'FLOP', 'TURN', 'RIVER', 'SHOWDOWN'],
    state: '',
    players: [],
    cur_player: 0,
    dealer: '',
    pot: 0,
    big_blind: 0,
    small_blind: 0,
    total_money: 0,
    result: {winner: '', rank: {}, is_tie: false},
    all_card_ids: {},
    view: {},
    dom: {
        "g_state": {
            value: '',
            type: 'text',
            ref: 'state'
        },
        "g_pot": {
            value: '',
            type: 'text',
            ref: 'pot'
        }
    },
    init: function (players, small_blind) {
        this.players = players;
        this.small_blind = small_blind;
        this.state = this.states[0];
        this.total_money = player.stack * 2;   // for checking transactions
        this.view = new View(this.dom);
        this.clean_cards();
        this.view.render(this);
    },
    clean_cards: function () {
        $(".card").hide();
        /*      deprecated??
         _.each($(".back img"), function (c) {
         c.src = '';
         })
         _.each($(".front img"), function (c) {
         c.src = '';
         })
         */
        $(".flipped").removeClass("flipped");
    },
    gameover: function (sb) {
        log("game.gameover");
        if (player.stack < sb || npc.stack < sb) {
            menu.show("GAMEOVER");
            log("Gameover: player.stack:" + player.stack + " npc.stack:" + npc.stack);
        }
    },
    fold: function (folder) {
        //log("b4 fold player stack " + player.stack + "  this.pot " + this.pot);
        //log(player);
        this.result = {winner: folder == player.name ? npc.name : player.name, rank: {}, win: this.pot, is_tie: false};
        log("we have a fold: winner is " + this.result.winner + " folder was:" + folder);
        this.payout();
        log("foldii i think this comes firsttt");
        //this.start();
        this.state = 'SHOWDOWN';
    },
    payout: function () {
        log("game.payout");
        log(this.result)
        if (this.result && this.result.winner.length > 0) {
            if (this.result.winner == player.name) {
                player.stack = parseInt(parseInt(player.stack, 10) + parseInt(this.pot, 10), 10);
                this.pot = 0;
            }
            else if (this.result.winner == npc.name) {
                npc.stack = parseInt(parseInt(npc.stack, 10) + parseInt(this.pot, 10), 10);
                this.pot = 0;
            }
            else {
                log("payout() exception: winner unknown ");
            }
            menu.show("WINNER");
        }
        else {
            log("payout() exception: no result");
        }
        // reset result
        // assert
        if(this.total_money != parseInt(player.stack,10) + parseInt(npc.stack,10)) {
            log("exception total money!!!");
        }
        result = {};
    },
    start: function (small_blind) {
        log("game.start");
        this.clean_cards();
        this.small_blind = small_blind;
        this.pot = 0;
        player.stake = 0;
        npc.stake = 0;
        this.result = {};
        this.toggleDealer();
        npc.action = ' ';
        this.gameover(small_blind);
        // this.render();
    },
    toggleDealer: function () {
        log("game.toggleDealer");
        this.dealer = '';
        // dealer == smallblind, plays first PREFLOP. after PREFLOP bigblind acts first
        if (this.cur_player == this.players[0]) {
            this.cur_player = this.players[1];
            this.players[1].pay_blind(this.small_blind * 2);
            this.players[0].pay_blind(this.small_blind);
            $("#p_name").removeClass("selected");
            $("#n_name").addClass("selected");
        } else {
            this.cur_player = this.players[0];
            this.players[0].pay_blind(this.small_blind * 2);
            this.players[1].pay_blind(this.small_blind);
            $("#p_name").addClass("selected");
            $("#n_name").removeClass("selected");
        }
        this.dealer = this.cur_player.name;
    },
    next: function () {
        this.next_state();
        log(this.state);

        if (this.state == 'ANTE') {

        }
        else if (this.state == 'PREFLOP') {
            this.turn1();
        } else if (this.state == 'FLOP') {
            this.turn2();
        } else if (this.state == 'TURN') {
            this.turn3();
        } else if (this.state == 'RIVER') {
            this.turn4();
        } else if (this.state == 'SHOWDOWN') {
            this.turn5();
        }
        else {
            log("next() exception: state unknown " + this.state);
        }
        main.render();
    },
    next_state: function () {
        var cur_index = parseInt(getKeysByValue(this.states, this.state), 10);
        if (this.states[cur_index + 1]) {
            this.state = this.states[cur_index + 1];
        } else {
            this.state = this.states[0];
        }
    },
    turn1: function () {
        this.start(this.small_blind);  // too init!
        deck.init();
        player.hand = deck.deal(2);
        npc.hand = deck.deal(2);
        player.view.unfoldCards(player.get_card_ids());
        var best1 = evaluator.run(player.hand);
        var best2 = evaluator.run(npc.hand);

        if (this.dealer == npc.name) npc.act(board.cards);
    },
    turn2: function () {
        board.cards = deck.deal(3);
        board.view.unfoldCards(board.get_card_ids().slice(0, 3));
        var best1 = evaluator.run(board.cards.concat(player.hand));
        var best2 = evaluator.run(board.cards.concat(npc.hand));

        if (this.dealer == player.name) npc.act(board.cards);
    },
    turn3: function () {
        board.cards = _.union(board.cards, deck.deal(1));
        board.view.unfoldCards(board.get_card_ids().slice(3, 4));
        var best1 = evaluator.run(board.cards.concat(player.hand));
        var best2 = evaluator.run(board.cards.concat(npc.hand));

        if (this.dealer == player.name) npc.act(board.cards);
    },
    turn4: function () {
        board.cards = _.union(board.cards, deck.deal(1));
        board.view.unfoldCards(board.get_card_ids().slice(4, 5));
        var best1 = evaluator.run(board.cards.concat(player.hand));
        var best2 = evaluator.run(board.cards.concat(npc.hand));

        if (this.dealer == player.name) npc.act(board.cards);
    },
    turn5: function () {
        npc.view.unfoldCards(npc.get_card_ids());
        var best1 = evaluator.run(board.cards.concat(player.hand));
        var best2 = evaluator.run(board.cards.concat(npc.hand));
        var hc_cmp = best1.cmp_highcards(best2, 1);
        if (best1.rank < best2.rank) {
            this.result = {winner: player.name, rank: _.clone(best1), win: npc.stake, is_tie: false};
            log("player wins:" + player.stack);
        } else if (best1.rank > best2.rank) {
            npc.stack = parseInt(npc.stack, 10) + parseInt(this.pot, 10);
            log("npc wins:");
            this.result = {winner: npc.name, rank: _.clone(best2), win: player.stake, is_tie: false};
        } else if (best1.rank == best2.rank) {
            // var hc_cmp = best1.cmp_highcards(best2, 1);
            if (hc_cmp == 1) {
                player.stack = parseInt(player.stack, 10) + parseInt(this.pot, 10);
                log("player wins h:" + player.stack);
                this.result = {winner: player.name, rank: _.clone(best1), win: npc.stake, is_tie: false};
            } else if (hc_cmp == -1) {
                npc.stack = parseInt(npc.stack, 10) + parseInt(this.pot, 10);
                log("npc wins h:");
                this.result = {winner: npc.name, rank: _.clone(best2), win: player.stake, is_tie: false};
            } else if (hc_cmp == 0) {
                player.stack = parseInt(player.stack, 10) + parseInt(this.pot / 2, 10);
                npc.stack = parseInt(npc.stack, 10) + parseInt(this.pot / 2, 10);
                log("tie:");
                this.result = {winner: '', rank: _.clone(best1), win: 0, is_tie: true};
            }
        } else {
            log("invalid game state!");
        }
        this.payout();
        menu.show("WINNER");
        log(best1);
        log(best2);
    },
    render: function () {
        this.view.render(this);
    }

};