const Blog = require('../models/blog.model');

async function CreateBlog(req, res, next) {
    const blogData = req.body;
    const user_id = req.userData.user;

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
        req.query.page = req.query.page ?? 0;
        let perPage = 5, page = req.query.page
        let search = req.query.search ?? '';
        console.log(page, perPage, search);
        let blogs = await Blog.find({
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
            ]
        }).populate('author').limit(perPage).skip(perPage * page).exec();
        
        blogs.map(blog => {
            blog.author.salt = undefined;
            blog.author.hash = undefined;
            blog.author.address = undefined;
            blog.author.attributes = undefined;
            return blog;
        })
        
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
        let blog = await Blog.findById(blog_id).populate('author').exec();

            blog.author.salt = undefined;
            blog.author.hash = undefined;
            blog.author.address = undefined;
            blog.author.attributes = undefined;
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

async function GetBlogsByAuthor(req, res, next) {
    const author_id = req.params.author_id;
    try {
        let blogs = await Blog.find({author: author_id}).populate('author').exec();
        blogs.map(blog => {
            blog.author.salt = undefined;
            blog.author.hash = undefined;
            blog.author.address = undefined;
            blog.author.attributes = undefined;
            return blog;
        })
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

async function GetBlogsByTag(req, res, next) {
    const tag = req.params.tag;
    try {
        let blogs = await Blog.find({tags: tag}).populate('author').exec();
        blogs.map(blog => {
            blog.author.salt = undefined;
            blog.author.hash = undefined;
            blog.author.address = undefined;
            blog.author.attributes = undefined;
            return blog;
        })
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

async function GetTop5Blogs(req, res, next) {
    try {
        let blogs = await Blog.find({}).sort({likeCount: -1}).limit(5).populate('author').exec();
        blogs.map(blog => {
            blog.author.salt = undefined;
            blog.author.hash = undefined;
            blog.author.address = undefined;
            blog.author.attributes = undefined;
            return blog;
        })
        return res.json({
            status: true,
            message: 'Top 5 blogs found.',
            data: blogs,
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
    if (req.userData.id !== blogToUpdate.author) {
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
    if (req.userData.id !== blogToDelete.author) {
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
    const user_id = req.userData.user;
    try {
        const blog = await Blog.findById(blog_id).exec();
        const likes = blog.likes;
        if (likes.includes(user_id)) {
            likes.pop(user_id);
        }
        else {
            likes.push(user_id);
        }
        const likeCount = likes.length;
        const updatedBlog = await Blog.findByIdAndUpdate(blog_id, { likes: likes, likeCount: likeCount}, { new: true }).exec();
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
    GetTop5Blogs,
    GetBlogsByAuthor,
    GetBlogsByTag,
}