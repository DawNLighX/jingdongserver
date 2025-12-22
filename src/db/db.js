/**
 * @description mongoose 连接数据库
 * @author DawNLighX
 * */

const mongoose = require('mongoose')

// Base URL
const BASE_URL = 'mongodb+srv://DawNLighX:Xli328516HBND@dawnlighxdb.yooydno.mongodb.net/?appName=DawNLighXDB' // 本地默认的 mongodb
const DB_NAME = 'jingdongDB'

// 开始连接
const connectionString = BASE_URL.replace('/?', `/${DB_NAME}?`);

async function connect() {
    try {
        await mongoose.connect(connectionString)
        
        console.log(`成功连接到MongoDB Atlas！`);
        console.log(`cluster: DawNLighXDB`);
        console.log(`数据库: ${DB_NAME}`);
    } catch (ex) {
        console.error('连接失败',ex)
    }
}

connect()

module.exports = mongoose