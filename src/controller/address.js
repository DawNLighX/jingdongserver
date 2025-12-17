/**
 * @description address controller
 * @author DawNLighX
 */

const Address = require('../models/Address')

/**
 * 创建收货地址
 * @param {string} username 用户名
 * @param {Object} data 地址的详细信息
 * @returns 
 */
async function createAddress(username, data) {
    const newAddress = await Address.create({
        username,
        ...data
    })
    return newAddress
}

/**
 * 获取收获地址列表
 * @param {string} username 用户名
 * @returns 
 */
async function getAddressList(username) {
    const list = await Address.find({ username }).sort({ updatedAt: -1 })
    return list
}

/**
 * 获取单个收获地址列表
 * @param {string} id 动态参数
 * @returns 
 */
async function getAddressById(id) {
    const address = await Address.findById(id)
    return address
}

/**
 * 更新收货地址
 * @param {string} id 
 * @param {string} username 
 * @param {Object} data 
 * @returns 
 */
async function updateAddress(id, username, data) {
    const address = await Address.findOneAndUpdate(
        {
            _id: id,
            username
        },
        {
            username,
            ...data
        },
        {
            new: true
        }
    )
    return address
}

module.exports = {
    createAddress,
    getAddressList,
    getAddressById,
    updateAddress
}
