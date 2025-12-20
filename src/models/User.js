/**
 * @description User Model
 * @author DawNLighX
 */

const mongoose = require('../db/db')
const bcrypt = require('bcryptjs')

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

// 保存前加密密码
Schema.pre('save', async function() {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

// 添加密码比对方法
Schema.methods.comparePassword = async function(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password)
}

const User = mongoose.model('user', Schema)

module.exports = User