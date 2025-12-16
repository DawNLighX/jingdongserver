/**
 * @description address controller
 * @author DawNLighX
 */

const Address = require('../models/Address')

/**
 * 创建地址
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

module.exports = {
    createAddress,
}
