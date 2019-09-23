const express = require('express');
const router = express.Router();
const involvedDocumentsController = require('../controllers/involvedDocumentsController')

router.post('/addInvolvedDocuments', (req, res) => {
    involvedDocumentsController.addInvolvedDocuments(req, res);
});

router.get('/', (req, res) => {
    involvedDocumentsController.getAllInvolvedDocuments(req, res);
});

router.put('/updateInvolvedDocuments/:id', (req, res) => {
    involvedDocumentsController.updateOneInvolvedDocuments(req, res);
});

router.post('/deleteInvolvedDocuments/:id', (req, res) => {
    involvedDocumentsController.deleteOneInvolvedDocuments(req, res);
});

router.get('/:id', (req, res) => {
    involvedDocumentsController.getOneInvolvedDocuments(req, res);
});

module.exports = router;