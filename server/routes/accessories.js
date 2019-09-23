const express = require('express');
const router = express.Router();
const accessoriesController = require('../controllers/accessoriesController')

router.post('/addAccessories', (req, res) => {
    accessoriesController.addAccessories(req, res);
});

router.get('/', (req, res) => {
    accessoriesController.getAllAccessories(req, res);
});

router.put('/updateAccessories/:id', (req, res) => {
    accessoriesController.updateOneAccessories(req, res);
});

router.post('/deleteAccessories/:id', (req, res) => {
    accessoriesController.deleteOneAccessories(req, res);
});

router.get('/:id', (req, res) => {
    accessoriesController.getOneAccessories(req, res);
});

module.exports = router;