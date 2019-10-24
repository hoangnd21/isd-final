const express = require('express');
const router = express.Router();
const liquidationController = require('../controllers/liquidationController')

router.post('/addLiquidation', (req, res) => {
    liquidationController.addLiquidation(req, res);
});

router.get('/', (req, res) => {
    liquidationController.getAllLiquidation(req, res);
});

router.put('/updateLiquidation/:id', (req, res) => {
    liquidationController.updateLiquidation(req, res);
});

router.post('/deleteLiquidation/:id', (req, res) => {
    liquidationController.deleteLiquidation(req, res);
});

router.get('/:id', (req, res) => {
    liquidationController.getOneLiquidation(req, res);
});

module.exports = router;