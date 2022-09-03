const mongoose = require('mongoose')
const crypto = require('crypto')
const { nanoid } = require('napi-nanoid')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        require: true,
    },
    name: {
        first_name: {
            type: String,
            require: true,
        },
        last_name: {
            type: String,
            require: true,
        },
    },
    phone: {
        type: String,
        default: '',
    },
    address: {
        street: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        state: {
            type: String,
            default: '',
        },
        zip: {
            type: String,
            default: '',
        },
        country: {
            type: String,
            default: '',
        },
    },
    birthday: {
        type: Date,
        default: Date.now,
    },
    salt: {
        type: String,
    },
    hash: {
        type: String,
    },
    attributes: {
        isVerified: {
            type: Boolean,
            default: false,
        },
        emailVerificationToken: {
            type: String,
            default: nanoid(),
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
})

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex')
}

userSchema.methods.validatePassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex')
    return this.hash === hash
}

module.exports = mongoose.model('User', userSchema)
