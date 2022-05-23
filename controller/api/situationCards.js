const fs = require('fs');
const path = require('path');

const situationCardsController = {
    readJSON: function () {
        return JSON.parse(
            fs.readFileSync(
                path.join(__dirname, '../../model/situation-cards.json'),
                'utf8'
            )
        );
    },

    selectRandomCard: function () {
        const situationCardsData = this.readJSON();
        let randomIndex = Math.floor(Math.random() * situationCardsData.length);
        return situationCardsData[randomIndex];
    },

    getSituationCards: function (req, res) {
        res.json({
            meta: {
                status: 200,
                url: '/api/situations',
            },
            data: situationCardsController.selectRandomCard(),
        });
    },
};

module.exports = situationCardsController;
