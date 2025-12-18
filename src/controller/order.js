/**
 * @description order controller
 * @author DawNLighX
 */

const Order = require('../models/Order');
const Product = require('../models/Product');
const Address = require('../models/Address');

/**
 * 创建订单
 * @param {string} username 用户名
 * @param {Object} data 数据
 * @returns {Object} 订单
 */
async function createOrder(username, data) {
    const {
        addressId,
        shopId,
        shopName,
        isCanceled = false, // 默认值
        products = [] // 默认值
    } = data

    const address = await Address.findById(addressId)
    const productIds = products.map(p => p.id) //['id1', 'id2']
    const productList = await Product.find({
        shopId,
        _id: {
            $in: productIds
        }
    })

    const productListWithSales = productList.map(p => {
        const id = p._id.toString()

        const filterProducts = products.filter(item => item.id === id)
        if (filterProducts.length === 0) {
            throw new Error('未找到匹配的销售数量')
        }

        return {
            product: p, 
            orderSales: filterProducts[0].num
        }
    })

    const newOrder = await Order.create({
        username,
        shopId,
        shopName,
        isCanceled,
        address,
        products: productListWithSales
    })

    return newOrder 
}

/**
 * 获取订单
 * @param {string} username 用户名
 * @returns {Object} 全部订单
 */
async function getOrder(username){
    const orderList = await Order.find({ username }).sort({ createdAt: -1 })

    return orderList
}

module.exports = {
    createOrder,
    getOrder
};