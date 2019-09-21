const express = require('express');
const router = express.Router();
const groupEquipmentController = require('../controllers/groupEquipmentController');

router.post('/addGroupEquipment', (req, res) => {
    groupEquipmentController.addGroupEquipment(req, res);
});

router.get('/', (req, res) => {
    groupEquipmentController.getAllGroupEquipment(req, res);
});

router.get('/:id', (req, res) => {
    groupEquipmentController.getOneGroupEquipment(req, res);
});

router.put('/updateGroupEquipment/:id', (req, res) => {
    groupEquipmentController.updateGroupEquipment(req, res);
});

router.post('/deleteGroupEquipment/:id', (req, res) => {
    groupEquipmentController.deleteGroupEquipment(req, res);
});

module.exports = router;