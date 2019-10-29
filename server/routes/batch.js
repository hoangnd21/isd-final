const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');

router.post('/addBatch', (req, res) => {
    batchController.addBatch(req, res);
});

router.get('/', (req, res) => {
    batchController.getAllBatch(req, res);
});

router.get('/:id', (req, res) => {
    batchController.getOneBatch(req, res);
});

router.put('/updateBatch/:id', (req, res) => {
    batchController.updateBatch(req, res);
});

router.post('/deleteBatch/:id', (req, res) => {
    batchController.deleteBatch(req, res);
});

module.exports = router;