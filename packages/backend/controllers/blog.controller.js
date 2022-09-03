const Blog = require('../models/blog.model');

async function CreateBlog(req, res, next) {
    const blogData = req.body;
    const user_id = req.userData.user_id;

    try {
        const blog = await Blog.create({
            content: blogData.content,
            title: blogData.title,
            author: user_id,
            tags: blogData.tags,
        });
        blog.save();
        return res.json({
            status: true,
            message: 'Blog created.',
            data: blog,
        });
    }
    catch (err) {
        next(err);
    }
}

async function GetAllBlogs(req, res, next) {
    try {
        const blogs = await Blog.find({}).populate('author').exec();
        return res.json({
            status: true,
            message: 'Blogs found.',
            data: blogs,
        });
    }
    catch (err) {
        next(err);
    }
}

async function GetBlogById(req, res, next) {
    const blog_id = req.params.blog_id;
    try {
        const blog = await Blog.findById(blog_id).populate('author').exec();
        return res.json({
            status: true,
            message: 'Blog found.',
            data: blog,
        });
    }
    catch (err) {
        next(err);
    }
}

async function UpdateBlog(req, res, next) {
    const blog_id = req.params.blog_id;
    let {content, title, tags} = req.body;
    const blogToUpdate = await Blog.findById(blog_id).exec();
    if (blogToUpdate === null) {
        return res.json({
            status: false,
            message: 'Blog not found.',
        });
    }
    if (req.userData.user_id !== blogToUpdate.author) {
        return res.json({
            status: false,
            message: 'You are not the author of this blog.',
        });
    }
    if (!content && !title && !tags) {
        return res.json({
            status: false,
            message: 'Nothing to update.',
        });
    }
    const blogData = {
        content,
        title,
        tags,
    }
    try {
        const blog = await Blog.findByIdAndUpdate(blog_id, blogData, { new: true }).exec();
        return res.json({
            status: true,
            message: 'Blog updated.',
            data: blog,
        });
    }
    catch (err) {
        next(err);
    }
}

async function DeleteBlog(req, res, next) {
    const blog_id = req.params.blog_id;
    const blogToDelete = await Blog.findById(blog_id).exec();
    if (blogToDelete === null) {
        return res.json({
            status: false,
            message: 'Blog not found.',
        });
    }
    if (req.userData.user_id !== blogToDelete.author) {
        return res.json({
            status: false,
            message: 'You are not the author of this blog.',
        });
    }
    try {
        await Blog.findByIdAndDelete(blog_id).exec();
        return res.json({
            status: true,
            message: 'Blog deleted.',
        });
    }
    catch (err) {
        next(err);
    }
}

async function RateBlog(req, res, next) {
    const blog_id = req.params.blog_id;
    const user_id = req.userData.user_id;
    try {
        const blog = await Blog.findById(blog_id).exec();
        const likes = blog.likes;
        if (likes.includes(user_id)) {
            likes.pop(user_id);
        }
        else {
            likes.push(user_id);
        }
        const updatedBlog = await Blog.findByIdAndUpdate(blog_id, { likes: likes }, { new: true }).exec();
        return res.json({
            status: true,
            message: 'Blog liked.',
            data: updatedBlog,
        });
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    CreateBlog,
    GetAllBlogs,
    GetBlogById,
    UpdateBlog,
    DeleteBlog,
    RateBlog,
}