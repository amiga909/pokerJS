var gameLoop = function () {
    main.init();
};
var int = null;
$(document).ready(function () {
    gameLoop();
});


var main = {
    init: function () {
        deck.init();
        this.preload();
        player.init('pl', 1000);
        npc.init('cpu', player.stack);
        board.init();
        game.init([player, npc], 10);

        this.render();
    },
    preload: function () {
        STARTHANDS = poker_starthands;
        var images = [];
        var suits = CONFIG.SUITS;
        _.each(deck.cards, function(card, i){
            images[i] = new Image();
            images[i].src = CONFIG.PATH + card + CONFIG.EXT;
        });
    },
    render: function () {
        player.render();
        npc.render();
        board.render();
        game.render();
    }
}





 













