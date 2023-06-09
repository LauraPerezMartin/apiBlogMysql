const router = require('express').Router();
const { getAll, getById, create, update, deleteById } = require('../../models/autor.model');
const { getPostByAutorId } = require('../../models/post.model');

router.get('/', async (req, res) => {
    try {
        const [autores] = await getAll();
        res.json(autores);
    } catch (error) {
        res.status(503).json({ Error: error.message })
    }
});

//recuperamos un autor con todos sus posts
router.get('/posts/:autorId', async (req, res) => {
    const { autorId } = req.params;
    try {
        const [result] = await getById(autorId);
        if (result.length === 0) {
            return res.json('Error, el autor no existe');
        }
        const [autor] = result;
        const [posts] = await getPostByAutorId(autorId);
        if (posts.length === 0) {
            posts[0] = 'Este autor no tiene noticias'
        }
        autor.posts = posts;
        res.json(autor);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
})

router.get('/:autorId', async (req, res) => {
    const { autorId } = req.params;
    try {
        const [result] = await getById(autorId);
        if (result.length === 0) {
            return res.json('Error: ese autor no existe');
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
        if (autor.length === 0) {
            return res.json('Error: el autor no exite');
        }
        res.json(autor[0]);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
})

router.delete('/:autorId', async (req, res) => {
    const { autorId } = req.params;
    try {
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