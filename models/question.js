const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema( {
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
    createdAt: {
    type: Date,
    default: Date.now()
    }
})

const question = mongoose.model('question', questionSchema)

module.exports = {
    question
}