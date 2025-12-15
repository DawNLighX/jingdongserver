/**
 * @description mongoose 连接数据库
 * @author DawNLighX
 * */

const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017' // 本地默认的 mongodb
const dbName = 'jingdongDB'

// 开始连接
mongoose.connect(`${url}/${dbName}`)

//连接对象
const db = mongoose.connection

db.on('error', err => {
    console.log('mongoose connect error', err)
})

db.once('open', () => {
    console.log('jingdongDB 连接成功!')
})

module.exports = mongoose