const express = require('express');
const router = express.Router();
const errorReportController = require('../controllers/errorReportController')

router.post('/addErrorReport', (req, res) => {
    errorReportController.addErrorReport(req, res);
});

router.get('/', (req, res) => {
    errorReportController.getAllErrorReport(req, res);
});

router.put('/updateErrorReport/:id', (req, res) => {
    errorReportController.updateOneErrorReport(req, res);
});

router.post('/deleteErrorReport/:id', (req, res) => {
    errorReportController.deleteOneErrorReport(req, res);
});

router.get('/:id', (req, res) => {
    errorReportController.getOneErrorReport(req, res);
});

module.exports = router;