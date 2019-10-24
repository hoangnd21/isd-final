const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController')

router.post('/addnotification', (req, res) => {
    notificationController.addNotification(req, res);
});

router.get('/', (req, res) => {
    notificationController.getAllNotification(req, res);
});

router.put('/updatenotification/:id', (req, res) => {
    notificationController.updateNotification(req, res);
});

router.post('/deletenotification/:id', (req, res) => {
    notificationController.deleteNotification(req, res);
});

router.get('/:id', (req, res) => {
    notificationController.getOneNotification(req, res);
});

router.get('/unread', (req, res) => {
    notificationController.getUnReadNotification(req, res);
});

module.exports = router;