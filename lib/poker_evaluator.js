// params: 5-7 cards ARRAY
function PokerEvaluator(cards) {
    this.cards = cards;
    this.rank = 0;
    this.rank_str = '';
    this.highcards = [];

    this.ranks = {
        'ROYAL_FLUSH': 1,
        'STRAIGHT_FLUSH': 2,
        'QUADS': 3,
        'FULL_HOUSE': 4,
        'FLUSH': 5,
        'STRAIGHT': 6,
        'TRIPS': 7,
        'TWO_PAIR': 8,
        'PAIR': 9,
        'HIGH_CARD': 10
    }
    this.suits = _.map(this.cards, function (s) {
        return s.charAt(s.length - 1);
    });
    this.values = _.map(this.cards,function (s) {
        return s.slice(0, -1);
    }).sort(function (a, b) {
            return a - b
        });
    this.sets = _.countBy(this.values, function (s) {
        return s;
    });
    // main
    this.calculate = function () {
        this.is_flush = this.is_flush();
        this.is_straight = this.is_straight();
        if (this.is_flush && this.is_straight) {
            if (this.values[0] == 14) {
                this.rank = this.ranks['ROYAL_FLUSH'];
            } else {
                this.rank = this.ranks['STRAIGHT_FLUSH'];
            }
        } else if (this.is_quads()) {
            this.rank = this.ranks['QUADS'];
        } else if (this.is_full_house()) {
            this.rank = this.ranks['FULL_HOUSE'];
        } else if (this.is_flush) {
            this.highcards = this.values.sort(function (a, b) {
                return b - a
            });
            this.rank = this.ranks['FLUSH'];
        } else if (this.is_straight) {
            this.rank = this.ranks['STRAIGHT'];
        } else if (this.is_trips()) {
            this.rank = this.ranks['TRIPS'];
        } else if (this.is_two_pair()) {
            this.rank = this.ranks['TWO_PAIR'];
        } else if (this.is_pair()) {
            this.rank = this.ranks['PAIR'];
        } else {
            this.highcards = this.values.sort(function (a, b) {
                return b - a
            });
            this.rank = this.ranks['HIGH_CARD'];
        }
        this.rank_str = getKeyByValue(this.ranks, this.rank).replace(/_/g, ' ');
        return {
            'rank': this.rank,
            'high_cards': this.highcards,
            'rank_str': this.rank_str
        };
    }

    this.is_flush = function () {
        var suits = _.countBy(this.suits, function (s) {
            return s;
        });
        return _.size(suits) == 1 ? true : false;
    }
    this.is_straight = function () {
        var that = this;
        var is_straight = true
        _.each(that.values, function (c, i) {
            if (that.values[i + 1]
                && (that.values[i + 1] - that.values[i] != 1)) {
                is_straight = false;
            }
        });
        if (is_straight) {
            that.highcards = that.values.sort(function (a, b) {
                return b - a
            });
        }
        // wheel
        else if (that.values.sort(function (a, b) {
            return a - b
        }).toString() == "2,3,4,5,14") {
            is_straight = true;
            that.highcards = [5, 4, 3, 2, 1];
        }
        return is_straight;
    }
    this.is_quads = function () {
        var that = this;
        if (_.values(that.sets).sort(function (a, b) {
            return a - b
        }).toString() == "1,4") {
            that.highcards = [getKeyByValue(that.sets, 4),
                getKeyByValue(that.sets, 4), getKeyByValue(that.sets, 4),
                getKeyByValue(that.sets, 4), getKeyByValue(that.sets, 1)]
            return true;
        } else {
            return false;
        }
    }
    this.is_full_house = function () {
        var that = this;
        if (_.values(that.sets).sort(function (a, b) {
            return a - b
        }).toString() == "2,3") {
            that.highcards = [getKeyByValue(that.sets, 3),
                getKeyByValue(that.sets, 3), getKeyByValue(that.sets, 3),
                getKeyByValue(that.sets, 2), getKeyByValue(that.sets, 2)]
            return true;
        } else {
            return false;
        }
    }
    this.is_trips = function () {
        var that = this;
        var ones = getKeysByValue(that.sets, 1).sort(function (a, b) {
            return a - b
        });
        if (_.values(that.sets).sort(function (a, b) {
            return a - b
        }).toString() == "1,1,3") {
            that.highcards = [getKeyByValue(that.sets, 3),
                getKeyByValue(that.sets, 3), getKeyByValue(that.sets, 3),
                ones[1], ones[0]]
            return true;
        } else {
            return false;
        }
    }
    this.is_two_pair = function () {
        var that = this;
        var pairs = getKeysByValue(that.sets, 2).sort(function (a, b) {
            return a - b
        });
        if (_.values(that.sets).sort().toString() == "1,2,2") {
            that.highcards = [pairs[1], pairs[1], pairs[0], pairs[0],
                getKeyByValue(that.sets, 1)]
            return true;
        } else {
            return false;
        }
    }
    this.is_pair = function () {
        var that = this;
        var ones = getKeysByValue(that.sets, 1).sort(function (a, b) {
            return a - b
        });
        if (_.values(that.sets).sort(function (a, b) {
            return a - b
        }).toString() == "1,1,1,2") {
            that.highcards = [getKeyByValue(that.sets, 2),
                getKeyByValue(that.sets, 2), ones[2], ones[1], ones[0]]
            return true;
        } else {
            return false;
        }
    }
}

// should work with any board/hand size
var evaluator = {
    best: {},
    max: function (ranks) {
        var that = this;
        this.best = new Rank();
        var cur = new Rank();
        _.each(ranks, function (cur) {
            if (that.best.rank > cur.rank) {
                that.best = cur;
            } else if (that.best.rank == cur.rank) {
                if (cur.cmp_highcards(that.best) == 1) {
                    that.best.highcards = cur.highcards;
                    that.best.hand = cur.hand;
                }
            }
        });
        return that.best;
    },
    run: function (cards) {
        this.best = new Rank();
        if (cards.length == 2) {
            this.best.hand_rank = STARTHANDS.get_rank(cards);
            this.best.hand = cards;
        }
        else {
            var combos = combine(cards, CONFIG.BOARD_SIZE);
            var ranks = [];
            _.each(combos, function (c) {
                var p = new PokerEvaluator(c);
                p.calculate();
                var rank = new Rank(p);
                ranks.push(rank);
            });
            this.best = this.max(ranks);
        }
        return this.best;
    }
}
