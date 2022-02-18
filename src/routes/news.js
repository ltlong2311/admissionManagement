const express = require('express');
const router = express.Router();

const newsController = require('../controllers/NewsController');

router.get('/create', newsController.create);
router.post('/store', newsController.store);
router.get('/:id/edit', newsController.edit);
router.get('/:slug', newsController.show);
router.put('/:id', newsController.update);
router.patch('/:id/restore', newsController.restore);
router.delete('/:id', newsController.delete);
router.delete('/:id/force', newsController.destroy);
router.get('/api', newsController.index);

module.exports = router;
