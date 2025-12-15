/**
 * @description Address Model
 * @author DawNLighX
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    username: {
        type: String, 
        required: true,
    },
    city: {
        type: String, 
        required: true,
    },
    department: {
        type: String, 
        required: true,
    },
    houseNumber: {
        type: String, 
        required: true,
    },
    name: {
        type: String, 
        required: true
    },
    phone: {
        type: String, 
        required: true
    },
}, { timestamps: true })

const Address = mongoose.model('address', Schema)

module.exports = Address