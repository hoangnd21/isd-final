const express = require('express');
const router = express.Router();
const warrantyController = require('../controllers/warrantyController')

router.post('/addWarranty', (req, res) => {
    warrantyController.addWarranty(req, res);
});

router.get('/', (req, res) => {
    warrantyController.getAllWarranty(req, res);
});

router.put('/updateWarranty/:id', (req, res) => {
    warrantyController.updateOneWarranty(req, res);
});

router.post('/deleteWarranty/:id', (req, res) => {
    warrantyController.deleteOneWarranty(req, res);
});

router.get('/:id', (req, res) => {
    warrantyController.getOneWarranty(req, res);
});

module.exports = router;