const fs = require('fs');
const path = require('path');

const gameFlowController = {
    readJSON: function () {
        return JSON.parse(
            fs.readFileSync(
                path.join(__dirname, '../../model/game-structure.json'),
                'utf8'
            )
        );
    },

    getGameFlow: function (req, res) {
        res.json({
            meta: {
                status: 200,
                url: '/api/flow',
            },
            data: gameFlowController.readJSON(),
        });
    },
};

module.exports = gameFlowController;
