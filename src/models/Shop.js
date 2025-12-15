/**
 * @description User Model
 * @author DawNLighX
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
    },
}, { timestamps: true })

const Shop = mongoose.model('shop', Schema)

module.exports = Shop