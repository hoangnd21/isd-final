const express = require('express');
const router = express.Router();
const upload = require('../controllers/upload')

router.post('/', (req, res, ) => {
    upload.upload(req, res);
});

module.exports = router;