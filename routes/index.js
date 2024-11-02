// routes/index.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const dataPath = path.join(__dirname, '../data/books.json');
    const books = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.render('index', { books });
});

module.exports = router;