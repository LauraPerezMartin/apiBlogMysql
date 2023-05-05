const router = require('express').Router();
const { getAll, getById, create, update, deleteById } = require('../../models/autor.model');

router.get('/', async (req, res) => {
    try {
        const [autores] = await getAll();
        res.json(autores);
    } catch (error) {
        res.status(503).json({ Error: error.message })
    }
});

router.get('/:autorId', async (req, res) => {
    try {
        const [result] = await getById(req.params.autorId);
        if (result.length === 0) {
            return res.json('Error: ese usuario no existe');
        }
        res.json(result[0]);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const [result] = await create(req.body);
        const [autor] = await getById(result.insertId);
        res.json(autor[0]);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
});

router.put('/:autorId', async (req, res) => {
    const { autorId } = req.params;
    try {
        await update(autorId, req.body);
        const [autor] = await getById(autorId);
        res.json(autor[0]);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
})

router.delete('/:autorId', async (req, res) => {
    try {
        const { autorId } = req.params;
        const [autor] = await getById(autorId);
        if (autor.length === 0) {
            return res.json('Error: ese usuario no existe');
        }
        await deleteById(autorId);
        res.json(autor[0]);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
})

module.exports = router;