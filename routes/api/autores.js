const router = require('express').Router();

router.get('/', (req, res) => {
    res.json('Listado de autores');
})

module.exports = router;