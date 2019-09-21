const express = require('express');
const router = express.Router();
const manaEquipOnUseController = require('../controllers/manaEquipOnUseController')

router.post('/addManaEquipOnUse', (req, res) => {
    manaEquipOnUseController.addManaEquipOnUse(req, res);
});

router.get('/', (req, res) => {
    manaEquipOnUseController.getAllManaEquipOnUse(req, res);
});

router.put('/updateManaEquipOnUse/:id', (req, res) => {
    manaEquipOnUseController.updateOneManaEquipOnUse(req, res);
});

router.post('/deleteManaEquipOnUse/:id', (req, res) => {
    manaEquipOnUseController.deleteOneManaEquipOnUse(req, res);
});

router.get('/:id', (req, res) => {
    manaEquipOnUseController.getOneManaEquipOnUse(req, res);
});

module.exports = router;