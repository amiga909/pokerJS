function Rank(p) {
    var that = this;
    if (typeof p === 'undefined') {
        this.hand = '';
        this.rank = 99;
        this.rank_str = '';
        this.highcards = [0, 0, 0, 0, 0];
        this.hand_rank = 0;
    } else {
        this.hand = p.hand || p.cards;
        this.rank = parseInt(p.rank, 10);
        this.rank_str = p.rank_str;
        this.hand_rank = p.hand_rank || 0;
        this.highcards = p.highcards.map(Number).sort(function (a, b) {
            return b - a
        });
    };
    /*
     * 1 => this > best , -1 => this < best, 0 => this == best
     */
    this.cmp_highcards = function (best, print) {
        var that = this;
        var res = -99;
        for (var i = 0; i < that.highcards.length; i++) {
            if (that.highcards[i] > best.highcards[i]) {
                return 1;
            } else if (that.highcards[i] < best.highcards[i]) {
                return -1;
            } else if (that.highcards[i] == best.highcards[i]) {
                if (!that.highcards[i + 1]) {
                    return 0;
                }
            }
        }
        return -999;
    };
}