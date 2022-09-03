const path = require('path')
const { nanoid } = require('napi-nanoid')

const S3 = require('aws-sdk/clients/s3')

const accessKeyId = process.env.S3_KEY
const secretAccessKey = process.env.S3_SECRET

const s3 = new S3({
    endpoint: process.env.S3_END_POINT,
    accessKeyId,
    secretAccessKey,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
})

function makeid(length) {
    let result = []
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength))
        )
    }
    return result.join('')
}

async function uploadFile(req, res, next) {
    const file = req.file
    const filename = nanoid(10) + path.extname(file.originalname)

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: filename,
        Body: file.buffer,
    }

    s3.upload(params, function (err, data) {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
        res.send(data)
    })
}

async function uploadImage(req, res, next) {
    let images = []
    let image = req.file

    let filename = `image-${nanoid()}.png`

    let params = {
        Bucket: process.env.S3_BUCKET,
        Key: filename,
        Body: image.buffer,
        ACL: 'public-read',
    }

    await s3.putObject(params, async function (err, data) {
        if (err) {
            console.error(err, err.stack)
        } else {
            images.push({
                src: `${process.env.S3_PUBLIC_URL}/${filename}`,
                filename,
                ETag: data.ETag,
            })
        }
        res.send(images[0])
        return images
    })
}

module.exports = {
    uploadFile,
    uploadImage,
}
