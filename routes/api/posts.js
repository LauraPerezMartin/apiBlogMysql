const router = require('express').Router();
const { getAll, getById, create, update, deleteById, getByAutorId } = require('../../models/post.model');

router.get('/', async (req, res) => {
    try {
        const [posts] = await getAll();
        res.json(posts);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
});

//recuperamos todos los posts de un autor
router.get('/autor/:autorId', async (req, res) => {
    const { autorId } = req.params;
    try {
        const [posts] = await getByAutorId(autorId);
        res.json(posts);
    } catch (error) {
        res.status(503).json({ Error: error.message })
    }
});

router.get('/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const [result] = await getById(postId);
        if (result.length === 0) {
            return res.json('Error: la noticia no existe');
        }
        res.json(result[0]);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const [result] = await create(req.body);
        const [post] = await getById(result.insertId);
        res.json(post[0]);

    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
});

router.put('/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        await update(postId, req.body);
        const [post] = await getById(postId);
        res.json(post[0]);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
});

router.delete('/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const [post] = await getById(postId);
        if (post.length === 0) {
            return res.json('Error: la noticia no existe')
        }
        await deleteById(postId);
        res.json(post[0]);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
});

module.exports = router;