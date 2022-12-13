const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema( {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password1: {
        type: String,
        required: true
    },
    createdAt: {
    type: Date,
    default: Date.now()
    }
})

const User = mongoose.model('user', userSchema)

module.exports = {
    User
}