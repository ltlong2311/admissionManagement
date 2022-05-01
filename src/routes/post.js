const express = require('express');
const router = express.Router();

const postController = require('../controllers/PostController');

router.get('/list', postController.index);
router.get('/:slug', postController.show);
router.get('/admissions', postController.showAdmission);
router.get('/admission/:slug', postController.showAdmission);
router.get('/activities', postController.showAdmission);
router.get('/activity/:slug', postController.showAdmission);

module.exports = router;
