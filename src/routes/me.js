const express = require('express');
const router = express.Router();

const meController = require('../controllers/MeController');

router.use('/stored/news', meController.storedNews);
router.use('/trash/news', meController.trashNews);

module.exports = router;
