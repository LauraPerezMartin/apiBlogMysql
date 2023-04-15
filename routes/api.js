const router = require('express').Router();
const apiAutoresRoutes = require('./api/autores')
const apiPostsRouter = require('./api/posts');

router.use('/autores', apiAutoresRoutes);
router.use('/posts', apiPostsRouter);

module.exports = router;