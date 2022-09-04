const route = require('express').Router()
const compiler_controller = require('../controllers/compiler.controller')
const auth_middleware = require('../middlewares/auth.middleware')

route.post('/check', compiler_controller.CreateCompiler)

module.exports = route
