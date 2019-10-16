const express = require('express');
const router = express.Router();
const subTypeController = require('../controllers/subType');

router.post('/addSubType', (req, res) => {
    subTypeController.addSubType(req, res);
});

router.get('/', (req, res) => {
    subTypeController.getAllSubType(req, res);
});

router.get('/:id', (req, res) => {
    subTypeController.getOneSubType(req, res);
});

router.put('/updateSubType/:id', (req, res) => {
    subTypeController.updateSubType(req, res);
});

router.post('/deleteSubType/:id', (req, res) => {
    subTypeController.deleteSubType(req, res);
});

router.get('/genTypeId/:id', (req, res) => {
    subTypeController.getSubTypeByGenTypeId(req, res);
});
module.exports = router;