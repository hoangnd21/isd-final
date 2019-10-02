const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')

router.get('/login', (req, res) => {
    loginController.redirectLogin(req, res);
});

router.post('/login', (req, res) => {
    loginController.login(req, res);
});

router.post('/logout', (req, res) => {
    loginController.logOut(req, res);
});

module.exports = router;