const express = require('express');
const router = express.Router();

const PostController = require('../../controllers/api/PostController');
const NewsController = require('../../controllers/api/NewsController');
const InfrastructureController = require('../../controllers/api/InfrastructureController');
const SpecializedController = require('../../controllers/api/SpecializedController');
const ActivityController = require('../../controllers/api/ActivityController');
const NotificationController = require('../../controllers/api/NotificationController');
const TuitionController = require('../../controllers/api/TuitionController');

// news
router.get('/all-news', NewsController.getAll);
router.get('/news/:id', NewsController.getById);
router.get('/news', NewsController.getItemById);
router.post('/add-news', NewsController.create);
router.put('/update-news', NewsController.update);
router.post('/delete-news', NewsController.delete);
router.patch('/restore-news', NewsController.restore);
router.delete('/destroy-news', NewsController.destroy);

//post
router.get('/all-posts', PostController.getAll);
router.get('/post/:id', PostController.getById);
router.get('/post', PostController.getItemById);
router.post('/add-post', PostController.create);
router.put('/update-post', PostController.update);
router.post('/delete-post', PostController.delete);
router.patch('/restore-post', PostController.restore);
router.delete('/destroy-post', PostController.destroy);

//infrastructure
router.get('/all-infrastructures', InfrastructureController.getAll);
router.get('/infrastructure/:id', InfrastructureController.getById);
router.get('/infrastructure', InfrastructureController.getItemById);
router.post('/add-infrastructure', InfrastructureController.create);
router.put('/update-infrastructure', InfrastructureController.update);
router.post('/delete-infrastructure', InfrastructureController.delete);
router.patch('/restore-infrastructure', InfrastructureController.restore);
router.delete('/destroy-infrastructure', InfrastructureController.destroy);

//specialized
router.get('/all-specialized', SpecializedController.getAll);
router.get('/specialized/:id', SpecializedController.getById);
router.get('/specialized', SpecializedController.getItemById);
router.post('/add-specialized', SpecializedController.create);
router.put('/update-specialized', SpecializedController.update);
router.post('/delete-specialized', SpecializedController.delete);
router.patch('/restore-specialized', SpecializedController.restore);
router.delete('/destroy-specialized', SpecializedController.destroy);

//activity
router.get('/all-activities', ActivityController.getAll);
router.get('/activity', ActivityController.getItemById);
router.post('/add-activity', ActivityController.create);
router.put('/update-activity', ActivityController.update);
router.delete('/delete-activity', ActivityController.destroy);

//notification
router.get('/all-notifications', NotificationController.getAll);
router.get('/notification', NotificationController.getItemById);
router.post('/add-notification', NotificationController.create);
router.put('/update-notification', NotificationController.update);
router.delete('/delete-notification', NotificationController.destroy);

//tuition
router.get('/all-tuitions', TuitionController.getAll);
router.get('/tuition', TuitionController.getItemById);
router.post('/add-tuition', TuitionController.create);
router.put('/update-tuition', TuitionController.update);
router.delete('/delete-tuition', TuitionController.destroy);

module.exports = router;
