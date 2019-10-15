const express = require('express');
const router = express.Router();
const reclaim = require('../controllers/reclaim')

router.get('/:id', (req, res) => {
    reclaim.getOneEquipmentDistributionByEquipId(req, res);
});

module.exports = router;