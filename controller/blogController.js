const asyncHandler = require('express-async-handler');
const Blog = require('../models/blogModel');

/* 
@desc   Get All Blog Posts
@route  GET/api/blog
@access Private
*/
const getAllBlog = asyncHandler( async (req, res) => {
    console.log(req)
    const blogs = await Blog.find()
    res.json(blogs);

});
// /* 
// @desc   Get a single blog
// @route  GET/api/blog
// @access Private
// */
// const getSingleBlog = asyncHandler( async (req, res) => {
//     console.log(req)
//     const blog = await Blog.findOne(req.params.id)
//     if(!blog){
//         res.status(400);
//         throw new Error("No blog found")
//     }else{
//         res.json(blog);
//     }
    

// });
/* 
@desc   Create blog
@route  POST/api/blog
@access Private
*/
const createBlog = asyncHandler(async (req, res) => {
    if(!req.body.author || !req.body.content || !req.body.title) {
        res.status(400)
        throw new Error('Please add a blog content');
    }
    console.log(req.body);
    const blog = await Blog.create({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content
    })
    res.json(blog);
});
/* 
@desc   Update blog
@route  PUT/api/blog
@access Private
*/
const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
        res.status(400)
        throw new Error('Blog not found')
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    })

    res.json(updatedBlog);
});
/* 
@desc   Delete blog
@route  DELETE/api/blog
@access Private
*/
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
        res.status(400)
        throw new Error('Blog not found')
    }
    await blog.remove()
    res.json({id: req.params.id});
});

module.exports = {
    getAllBlog,
    // getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog
}