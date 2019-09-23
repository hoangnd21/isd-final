const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController')

router.post('/addStatus', (req, res) => {
    statusController.addStatus(req, res);
});

router.get('/', (req, res) => {
    statusController.getAllStatus(req, res);
});

router.put('/updateStatus/:id', (req, res) => {
    statusController.updateOneStatus(req, res);
});

router.post('/deleteStatus/:id', (req, res) => {
    statusController.deleteOneStatus(req, res);
});

router.get('/:id', (req, res) => {
    statusController.getOneStatus(req, res);
});

module.exports = router;