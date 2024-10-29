const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const upload = require('../middlewares/upload');

router.post('/upload', upload.single('categoryImage'), categoryController.uploadCategoryImage)

router.get('/', categoryController.getCategory);

module.exports = router;
