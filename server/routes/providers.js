const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

router.post('/addProvider', (req, res) => {
    providerController.addProvider(req, res);
});

router.get('/', (req, res) => {
    providerController.getAllProviders(req, res);
});

router.get('/:id', (req, res) => {
    providerController.getOnerovider(req, res);
});

router.put('/updateProvider/:id', (req, res) => {
    providerController.updateProviders(req, res);
});

router.post('/deleteProvider/:id', (req, res) => {
    providerController.deleteProviders(req, res);
});

module.exports = router;