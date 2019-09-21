const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/addUser', (req, res) => {
  userController.addUser(req, res);
});

router.get('/', (req, res) => {
  userController.getAllUser(req, res);
});

router.put('/updateUser/:id', (req, res) => {
  userController.updateOneUser(req, res);
});

router.post('/deleteUser/:id', (req, res) => {
  userController.deleteOneUser(req, res);
});

router.get('/:id', (req, res) => {
  userController.getOneUser(req, res);
});

module.exports = router;