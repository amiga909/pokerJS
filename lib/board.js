var board = {
    cards: [],
    view: {},
    pot: 0,
    state: '',
    dom: {
        "b_card1_img": {
            value: '',
            type: 'card_image',
            ref: ['cards', 0]
        },
        "b_card2_img": {
            value: '',
            type: 'card_image',
            ref: ['cards', 1]
        },
        "b_card3_img": {
            value: '',
            type: 'card_image',
            ref: ['cards', 2]
        },
        "b_card4_img": {
            value: '',
            type: 'card_image',
            ref: ['cards', 3]
        },
        "b_card5_img": {
            value: '',
            type: 'card_image',
            ref: ['cards', 4]
        }
    },
    init: function () {
        this.view = new View(this.dom);
        this.view.render(this);
    },
    get_card_ids: function () {
        return this.view.get_card_ids(this.dom);
    },
    render: function () {
        this.view.render(this);
    }
}