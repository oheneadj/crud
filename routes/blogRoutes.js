const express = require('express');
const router = express.Router();
const { getAllBlog, getSingleBlog, createBlog, updateBlog, deleteBlog } = require('../controller/blogController');


router.get('/', getAllBlog)

// router.get('/:id', getSingleBlog)

router.post('/', createBlog)

router.put('/:id', updateBlog)

router.delete('/:id', deleteBlog)

module.exports = router;