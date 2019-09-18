const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')

router.post('/', (req, res) => {
    loginController.login(req, res);
});
module.exports = router;