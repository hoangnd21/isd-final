const express = require('express');
const router = express.Router();
const equipmentDistributionController = require('../controllers/equipmentDistributionController')

router.post('/addEquipmentDistribution', (req, res) => {
    equipmentDistributionController.addEquipmentDistribution(req, res);
});

router.get('/', (req, res) => {
    equipmentDistributionController.getAllEquipmentDistribution(req, res);
});

router.put('/updateEquipmentDistribution/:id', (req, res) => {
    equipmentDistributionController.updateOneEquipmentDistribution(req, res);
});

router.post('/deleteEquipmentDistribution/:id', (req, res) => {
    equipmentDistributionController.deleteOneEquipmentDistribution(req, res);
});

router.get('/:id', (req, res) => {
    equipmentDistributionController.getOneEquipmentDistribution(req, res);
});

module.exports = router;