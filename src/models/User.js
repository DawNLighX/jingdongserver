/**
 * @description User Model
 * @author DawNLighX
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String, 
        required: true,
    },
}, { timestamps: true })

const User = mongoose.model('user', Schema)

module.exports = User