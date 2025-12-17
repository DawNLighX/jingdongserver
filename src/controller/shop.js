/**
 * @description shop controller
 * @author DawNLighX
 */

const Shop = require('../models/Shop')
const Product = require('../models/Product')

/**
 * 获取商店列表（热门店铺）
 * @returns 
 */
async function getHotList() {
    const list = await Shop.find().sort({ _id: -1 })
    return list
}

/**
 * 获取单个商店详情
 * @param {string} id 商店id
 * @returns 
 */
async function getShopById(id) {
    const shop = await Shop.findById(id)
    return shop
}

/**
 * 获取商店商品信息
 * @param {string} shopId 商店id
 * @param {string} tab 分类
 */
async function getProductsByShopId(shopId, tab = 'all') {
    const products = await Product.find({
        shopId,
        tabs: {
            $in: tab
        }
    }).sort({ _id: -1 })
    return products
}

module.exports = {
    getHotList,
    getShopById,
    getProductsByShopId
};