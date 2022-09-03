const route = require('express').Router()
const blog_controller = require('../controllers/blog.controller')
const auth_middleware = require('../middlewares/auth.middleware')

route.post('/create', auth_middleware.verifyToken, blog_controller.CreateBlog)
route.get('/', blog_controller.GetAllBlogs)
route.get('/top5', blog_controller.GetTop5Blogs)
route.get('/:blog_id', blog_controller.GetBlogById)
route.get('/author/:author_id', blog_controller.GetBlogsByAuthor)
route.get('/tag/:tag', blog_controller.GetBlogsByTag)
route.post('/:blog_id/rate', auth_middleware.verifyToken, blog_controller.RateBlog)
route.put('/:blog_id', auth_middleware.verifyToken, blog_controller.UpdateBlog)
route.delete('/:blog_id', auth_middleware.verifyToken, blog_controller.DeleteBlog)

module.exports = route
