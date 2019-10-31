const express = require('express');
const router = express.Router();
const upload = require('../controllers/upload')

router.post('/', (req, res) => {
    upload.uploading(req, res);
});

router.post('/importExcel', (req, res) => {
    upload.importExcel(req, res);
});

module.exports = router;