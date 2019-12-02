const express = require('express');
const router = express.Router();
const reclaim = require('../controllers/reclaim')

router.get('/equipment/:id', (req, res) => {
    reclaim.getOneEquipmentDistributionByEquipId(req, res);
});

router.get('/accessory/:id', (req, res) => {
    reclaim.getOneAccessoryDistributionByEquipId(req, res);
});

module.exports = router;