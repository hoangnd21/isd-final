const express = require('express');
const router = express.Router();
const generalTypeController = require('../controllers/generalTypeController');

router.post('/addGeneralType', (req, res) => {
    generalTypeController.addGeneralType(req, res);
});

router.get('/', (req, res) => {
    generalTypeController.getAllGeneralType(req, res);
});

router.get('/:id', (req, res) => {
    generalTypeController.getOneGeneralType(req, res);
});

router.put('/updateGeneralType/:id', (req, res) => {
    generalTypeController.updateGeneralType(req, res);
});

router.post('/deleteGeneralType/:id', (req, res) => {
    generalTypeController.deleteGeneralType(req, res);
});

module.exports = router;