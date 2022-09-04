const upload_controller = require('../controllers/upload.controller')
const route = require('express').Router()
const path = require('path')
const multer = require('multer')

const storage = multer.memoryStorage({
    filename: (req, file, cb) => {
        const fileName = `file-${nanoid()}${path.extname(file.originalname)}`
        console.log(' Multer :- ' + fileName)
        cb(null, fileName)
    },
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (req._parsedUrl.path == '/image') {
            if (file.mimetype.startsWith('image')) {
                cb(null, true)
            } else {
                cb(null, false)
                req.error = 'Only .png, .jpg and .jpeg allowed'
                return cb(
                    null,
                    false,
                    new Error('Only .png, .jpg and .jpeg format allowed!')
                )
            }
        } else {
            cb(null, true)
        }
    },
})


route.post('/image', upload.single('image'), upload_controller.uploadImage)

module.exports = route