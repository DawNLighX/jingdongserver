/**
 * @description user controller
 * @author DawNLighX
 */

const User = require('../models/User')

/**
 * 注册
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns {Object} 用户信息
 */
async function register(username, password) {
    const newUser = await User.create({
        username,
        password
        // 密码会在User模型的save前钩子中自动加密
    })
    
    return newUser 
}

/**
 * 登录
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns {boolean|Object} 登录成功返回用户对象，失败返回false
 */
async function login(username, password) {
    const user = await User.findOne({
        username
    })
    
    if (user !== null) {
        // 使用bcrypt比对密码
        const isPasswordMatch = await user.comparePassword(password)
        if (isPasswordMatch) {
            return user
        }
    }
    
    return false
}

module.exports = {
    register,
    login
};