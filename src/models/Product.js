/**
 * @description Product Model
 * @author DawNLighX
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    shopId: {
        type: String,
        required: true
    },
    name: String,
    imgUrl: String,
    sales: Number,
    price: Number,
    oldPrice: Number,
    tabs: [String]
    
}, { timestamps: true })

const Product = mongoose.model('product', Schema)

module.exports = Product