/**
 * @description Product Model
 * @author DawNLighX
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    tabs: [String],
    shopId: {
        type: String,
        required: true
    },
    name: String,
    imgUrl: String,
    sales: Number,
    price: Number,
    oldPrice: Number
    
}, { timestamps: true })

const Product = mongoose.model('product', Schema)

module.exports = Product