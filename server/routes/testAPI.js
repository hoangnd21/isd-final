var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('“testAPI is working properly”');
});

module.exports = router;