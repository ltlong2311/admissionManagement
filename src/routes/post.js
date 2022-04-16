const express = require('express');
const router = express.Router();

const postController = require('../controllers/PostController');

router.get('/create', postController.create);
router.post('/store', postController.store);
router.get('/:id/edit', postController.edit);
router.get('/:slug', postController.show);
router.put('/:id', postController.update);
router.patch('/:id/restore', postController.restore);
router.delete('/:id', postController.delete);
router.delete('/:id/force', postController.destroy);
router.get('/api', postController.index);

module.exports = router;
