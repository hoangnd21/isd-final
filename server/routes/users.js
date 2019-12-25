const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/addUser', (req, res) => {
  userController.addUser(req, res);
});

router.get('/', (req, res) => {
  userController.getAllUser(req, res);
});

router.patch('/updateUser/:id', (req, res) => {
  userController.updateUser(req, res);
});

router.patch('/changePass/:id', (req, res) => {
  userController.changePass(req, res);
});

router.post('/deleteUser/:id', (req, res) => {
  userController.deleteOneUser(req, res);
});

router.get('/:id', (req, res) => {
  userController.getOneUser(req, res);
});

router.post('/getUser/checkPass', (req, res) => {
  userController.checkPass(req, res);
});

module.exports = router;