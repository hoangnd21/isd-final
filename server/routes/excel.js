const express = require('express');
const router = express.Router();
const excelController = require('../controllers/excelController')

router.get('/equipments', (req, res) => {
    excelController.xlsxAllEquipment(req, res);
});

router.get('/:id', (req, res) => {
    excelController.xlsxOneEquipment(req, res);
});


router.post('/import', (req, res) => {
    excelController.importExxcel(req, res);
});
module.exports = router