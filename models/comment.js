const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String
    }
})

module.exports = mongoose.model('comment', commentSchema)
   
