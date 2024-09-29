const router = require('express').Router();

router.get('/', async (req, res) => {
    res.send('Main page');
});

module.exports = router;
