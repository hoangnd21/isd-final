const express = require('express');
const router = express.Router();
const transport = require('../controllers/gmailController')

router.post('/', (req, res) => {
    transport.transport(req, res);
});

module.exports = router;