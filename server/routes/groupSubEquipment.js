const express = require('express');
const router = express.Router();
const groupSubEquipmentController = require('../controllers/groupSubEquipmentController');

router.post('/addGroupSubEquipment', (req, res) => {
    groupSubEquipmentController.addGroupSubEquipment(req, res);
});

router.get('/', (req, res) => {
    groupSubEquipmentController.getAllGroupSubEquipment(req, res);
});

router.get('/:id', (req, res) => {
    groupSubEquipmentController.getOneGroupSubEquipment(req, res);
});

router.put('/updateGroupSubEquipment/:id', (req, res) => {
    groupSubEquipmentController.updateGroupSubEquipment(req, res);
});

router.post('/deleteGroupSubEquipment/:id', (req, res) => {
    groupSubEquipmentController.deleteGroupSubEquipment(req, res);
});

module.exports = router;