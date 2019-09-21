const express = require('express');
const router = express.Router();
const adjustmentController = require('../controllers/adjustmentController')

router.post('/addAdjustment', (req, res) => {
    adjustmentController.addAdjustment(req, res);
});

router.get('/', (req, res) => {
    adjustmentController.getAllAdjustment(req, res);
});

router.put('/updateAdjustment/:id', (req, res) => {
    adjustmentController.updateOneAdjustment(req, res);
});

router.post('/deleteAdjustment/:id', (req, res) => {
    adjustmentController.deleteOneAdjustment(req, res);
});

router.get('/:id', (req, res) => {
    adjustmentController.getOneAdjustment(req, res);
});

module.exports = router;