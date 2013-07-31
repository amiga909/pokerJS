var game = {
    states: ['UNDEFINED', 'PREFLOP', 'FLOP', 'TURN', 'RIVER', 'SHOWDOWN'],
    state: '',
    players: [],
    cur_player: 0,
    pot: 0,
    big_blind: 0,
    small_blind: 0,
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

        this.view = new View(this.dom);
        this.clean_cards();
        this.view.render();

    },
    clean_cards: function(){
        $(".card").hide();
        _.each($(".back img"), function(c){
            c.src = '';
        })
       $(".flipped").removeClass("flipped");
    },
    end: function (winner) {
        //var showdown = parseInt(getKeysByValue(this.states, 'SHOWDOWN'), 10);
        var winner = typeof winner === 'undefined' ? '' : winner;

        if(winner == 'player') {
            player.stack = player.stack + this.pot;
        }else {
            npc.stack = npc.stack + this.pot;
        }
        this.pot = 0;
        this.state = this.states[5];
        game.next();

    },
    start: function (small_blind) {
        this.clean_cards();
        this.small_blind = small_blind;
        this.pot = 0;
        if (this.cur_player == this.players[0]) {
            this.cur_player = this.players[1];
            this.pot = this.players[1].pay_blind(small_blind * 2)
                + this.players[0].pay_blind(small_blind);
        } else {
            this.cur_player = this.players[0];
            this.pot = this.players[0].pay_blind(small_blind * 2)
                + this.players[1].pay_blind(small_blind);
        }
    },
    next: function () {
        var cur_index = parseInt(getKeysByValue(this.states, this.state), 10);
        if (this.states[cur_index + 1]) {
            this.state = this.states[cur_index + 1];
        } else {
            this.state = this.states[1];

        }
        // log(this.state );
        log(game.state);
        log("this.pot:"+this.pot);

        if (game.state == 'UNDEFINED') {

        }
        else if (game.state == 'PREFLOP') {
            this.start(this.small_blind);
            deck.init();
            player.hand = deck.deal(2);
            npc.hand = deck.deal(2);
            player.view.unfoldCards(player.get_card_ids(0,1));
            var best1 = evaluator.run(player.hand);
            var best2 = evaluator.run(npc.hand);

        } else if (game.state == 'FLOP') {
            board.cards = deck.deal(3);
            board.view.unfoldCards(board.get_card_ids().slice(0,3));
            var best1 = evaluator.run(board.cards.concat(player.hand));
            var best2 = evaluator.run(board.cards.concat(npc.hand));

        } else if (game.state == 'TURN') {
            board.cards = _.union(board.cards, deck.deal(1));
            board.view.unfoldCards(board.get_card_ids().slice(3,4));
            var best1 = evaluator.run(board.cards.concat(player.hand));
            var best2 = evaluator.run(board.cards.concat(npc.hand));
        } else if (game.state == 'RIVER') {
            log("player before RIVER");
            log(player);
            board.cards = _.union(board.cards, deck.deal(1));
            board.view.unfoldCards(board.get_card_ids().slice(4,5));
            var best1 = evaluator.run(board.cards.concat(player.hand));
            var best2 = evaluator.run(board.cards.concat(npc.hand));
        } else if (game.state == 'SHOWDOWN') {
            //this.pot = typeof this.pot !== 'number' ? 1 : this.pot;
            npc.view.unfoldCards(npc.get_card_ids());

            var best1 = evaluator.run(board.cards.concat(player.hand));
            var best2 = evaluator.run(board.cards.concat(npc.hand));
            var hc_cmp = best1.cmp_highcards(best2, 1);
            if (best1.rank < best2.rank) {
                player.stack = parseInt(player.stack,10) + parseInt(this.pot,10);
                log("player wins:" + player.stack);
            } else if (best1.rank > best2.rank) {
                npc.stack = parseInt(npc.stack,10) + parseInt(this.pot,10);
                log("npc wins:");
            } else if (best1.rank == best2.rank) {
                // var hc_cmp = best1.cmp_highcards(best2, 1);
                if (hc_cmp == 1) {
                    player.stack = parseInt(player.stack,10) + parseInt(this.pot,10);
                    log("player wins h:" + player.stack);

                } else if (hc_cmp == -1) {
                    npc.stack =  parseInt(npc.stack,10) + parseInt(this.pot,10);
                    log("npc wins h:");
                } else if (hc_cmp == 0) {
                    player.stack = parseInt(player.stack,10) + parseInt(this.pot / 2, 10);
                    npc.stack = parseInt(npc.stack,10) + parseInt(this.pot / 2, 10);
                    log("tie:");

                }
            } else {
                log("invalid game state!");
            }
            log(best1);
            log(best2);

        }
        main.render();
    },
    render: function () {
        var that = this;
        _.each(this.dom, function (data, key) {
            log(data.ref);
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