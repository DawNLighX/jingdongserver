/**
 * @description 测试数据连接
 * @author DawNLighX
 */

const User = require('../../models/User')

!(async () => {
    // // 创建数据
    // await User.create({
    //     username: '17631288141',
    //     password: 'Xli328516'
    // })

    // 获取用户信息
    const userFind = await User.findOne({
        username: '17631288141',
        password: 'Xli328516'
    })

    console.log('userFind', userFind);
})()

