const express = require('express');
const router = express.Router();
const accDistributionController = require('../controllers/accessoriesDistribution')

router.post('/addAccDistribution', (req, res) => {
    accDistributionController.addAccessoriesDistribution(req, res);
});

router.get('/', (req, res) => {
    accDistributionController.getAllAccessoriesDistribution(req, res);
});

router.patch('/updateAccDistribution/:id', (req, res) => {
    accDistributionController.updateAccessoriesDistribution(req, res);
});

router.post('/deleteAccDistribution/:id', (req, res) => {
    accDistributionController.deleteAccessoriesDistribution(req, res);
});

router.get('/:id', (req, res) => {
    accDistributionController.getOneAccessoriesDistribution(req, res);
});

module.exports = router;