const express = require('express');
const path = require('path');
const router = express.Router();
const actionCardsController = require('../controller/api/actionCards');
const situationCardController = require('../controller/api/situationCards');
const gameFlowController = require('../controller/api/gameFlow');

router.use('/actionCard', actionCardsController.getActionCards);
router.use('/situationCard', situationCardController.getSituationCards);
router.use('/gameFlow', gameFlowController.getGameFlow);

module.exports = router;
