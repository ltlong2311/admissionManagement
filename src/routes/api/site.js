const express = require('express');
const router = express.Router();

const PostController = require('../../controllers/api/PostController');
const NewsController = require('../../controllers/api/NewsController');

// news
router.get('/all-news', NewsController.getAll);
router.get('/news/:id', NewsController.getById);
router.get('/news', NewsController.getItemById);
router.post('/add-news', NewsController.create);
router.put('/update-news', NewsController.update);
router.post('/delete-news', NewsController.delete);
router.patch('/restore-news', NewsController.update);
router.delete('/destroy-news', NewsController.delete);

//post
router.get('/all-posts', PostController.getAll);
router.get('/post/:id', PostController.getById);
router.get('/post', PostController.getItemById);
router.post('/add-post', PostController.create);
router.put('/update-post', PostController.update);
router.post('/delete-post', PostController.delete);
router.patch('/restore-post', PostController.update);
router.delete('/destroy-post', PostController.delete);

module.exports = router;
