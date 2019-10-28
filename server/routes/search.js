const express = require('express');
const router = express.Router();
const search = require('../controllers/search')

router.get('/', (req, res) => {
    search.searchEquipments(req, res);
});

module.exports = router;