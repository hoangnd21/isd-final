const express = require('express');
const router = express.Router();
const transport = require('../controllers/passwordController')

router.post('/', (req, res) => {
    transport.transport(req, res);
});

module.exports = router;