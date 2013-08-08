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
        board.init();
        menu.init();
        menu.start_game();// debug
    },
    set_config: function (cfg) {
        player.init(cfg.name, cfg.stack);
        npc.init(cfg.cpu, cfg.stack);
        game.init([player, npc], cfg.small_blind);
    },
    preload: function () {
        STARTHANDS = poker_starthands;
        var images = [];
        _.each(deck.cards, function (card, i) {
            images[i] = new Image();
            images[i].src = CONFIG.PATH + card + CONFIG.EXT;
        });
    },
    run: function () {
        game.next();
    },
    render: function () {
        player.render();
        npc.render();
        board.render();
        game.render();
    }
}





 













