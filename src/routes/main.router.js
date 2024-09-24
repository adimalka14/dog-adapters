const router = require('express').Router();

router.get('/', function (req, res) {
    res.send('Main page');
});

module.exports = router;
