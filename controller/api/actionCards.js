const fs = require('fs');
const path = require('path');

const actionCardsController = {
    readJSON: function () {
        return JSON.parse(
            fs.readFileSync(
                path.join(__dirname, '../../model/action-cards.json'),
                'utf8'
            )
        );
    },

    selectRandomCard: function () {
        const actionCardsData = this.readJSON();
        let randomIndex = Math.floor(Math.random() * actionCardsData.length);
        return actionCardsData[randomIndex];
    },

    getActionCards: function (req, res) {
        res.json({
            meta: {
                status: 200,
                url: '/api/actions',
            },
            data: actionCardsController.selectRandomCard(),
        });
    },
};

module.exports = actionCardsController;
