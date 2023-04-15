const router = require('express').Router();

router.get("/", (req, res) => {
    res.json('lLstado de posts');
})

module.exports = router;