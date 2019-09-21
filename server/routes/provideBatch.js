const express = require('express');
const router = express.Router();
const provideBatchController = require('../controllers/provideBatchController');

router.post('/addProvideBatch', (req, res) => {
    provideBatchController.addProvideBatch(req, res);
});

router.get('/', (req, res) => {
    provideBatchController.getAllProvideBatch(req, res);
});

router.get('/:id', (req, res) => {
    provideBatchController.getOneProvideBatch(req, res);
});

router.put('/updateProvideBatch/:id', (req, res) => {
    provideBatchController.updateProvideBatch(req, res);
});

router.post('/deleteProvideBatch/:id', (req, res) => {
    provideBatchController.deleteProvideBatch(req, res);
});

module.exports = router;