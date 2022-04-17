const express = require('express');
const router = express.Router();

const PostController = require('../../controllers/api/PostController');
const NewsController = require('../../controllers/api/NewsController');
const InfrastructureController = require('../../controllers/api/InfrastructureController');
const SpecializedController = require('../../controllers/api/SpecializedController');

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

//infrastructure
router.get('/all-infrastructures', InfrastructureController.getAll);
router.get('/infrastructure/:id', InfrastructureController.getById);
router.get('/infrastructure', InfrastructureController.getItemById);
router.post('/add-infrastructure', InfrastructureController.create);
router.put('/update-infrastructure', InfrastructureController.update);
router.post('/delete-infrastructure', InfrastructureController.delete);
router.patch('/restore-infrastructure', InfrastructureController.update);
router.delete('/destroy-infrastructure', InfrastructureController.delete);

//specialized
router.get('/all-specialized', SpecializedController.getAll);
router.get('/specialized/:id', SpecializedController.getById);
router.get('/specialized', SpecializedController.getItemById);
router.post('/add-specialized', SpecializedController.create);
router.put('/update-specialized', SpecializedController.update);
router.post('/delete-specialized', SpecializedController.delete);
router.patch('/restore-specialized', SpecializedController.update);
router.delete('/destroy-specialized', SpecializedController.delete);

module.exports = router;
