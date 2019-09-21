const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController')

router.post('/addEquipment', (req, res) => {
    equipmentController.addEquipment(req, res);
});

router.get('/', (req, res) => {
    equipmentController.getAllEquipment(req, res);
});

router.put('/updateEquipment/:id', (req, res) => {
    equipmentController.updateOneEquipment(req, res);
});

router.post('/deleteEquipment/:id', (req, res) => {
    equipmentController.deleteOneEquipment(req, res);
});

router.get('/:id', (req, res) => {
    equipmentController.getOneEquipment(req, res);
});

module.exports = router;