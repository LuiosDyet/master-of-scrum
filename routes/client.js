const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/board', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/board.html'));
});

router.get('/hand', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/hand.html'));
});

module.exports = router;
