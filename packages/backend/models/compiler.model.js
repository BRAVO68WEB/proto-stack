const mongoose = require('mongoose');

const compilerSchema = new mongoose.Schema({
    code_content: {
        type: String,
        required: true
    },
    job_id: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Compiler = mongoose.model('Compiler', compilerSchema);

module.exports = Compiler;