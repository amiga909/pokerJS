// should be function!
var deck = {
    cards: [],
    init: function () {
        this.cards = [];
        var suits = CONFIG.SUITS;
        for (var i = 2; i <= 14; i++) {
            for (var j = 0; j < suits.length; j++) {
                this.cards.push(i + suits[j]);
            }
        }
        this.cards = _.shuffle(this.cards);

    },
    deal: function (amt) {
        var dealt = [];
        if (amt <= this.cards.length) {
            for (var i = 0; i < amt; i++) {
                dealt.push(this.cards.shift());
            }
        } else {
            // raise exception
            log("exception: not enough cards for requested " + amt);
        }
        return dealt;
    }
}