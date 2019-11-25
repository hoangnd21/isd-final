const express = require('express');
const router = express.Router();
const search = require('../controllers/search')

router.get('/equipments', (req, res) => {
    search.searchEquipments(req, res);
});

router.get('/accessories', (req, res) => {
    search.searchAccessories(req, res);
});

router.get('/users', (req, res) => {
    search.searchUser(req, res);
});
module.exports = router;