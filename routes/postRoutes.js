const express = require('express');
const router = express.Router();
const { createBlogPost, getBlogPost } = require('../controllers/postsController');
const { upload } = require('../middlewares/multer');

router.post('/createBlogPost', upload.single('banner'), createBlogPost);
router.get('/getBlogPost', getBlogPost);

module.exports = router;