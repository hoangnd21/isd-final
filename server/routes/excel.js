const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excelController')

router.get('/', (req, res) => {
    excelController.xlsxAllEquipment(req, res);
});

router.get('/:id', (req, res) => {
    excelController.xlsxOneEquipment(req, res);
});

module.exports = router