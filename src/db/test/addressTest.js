/**
 * @description 测试数据连接
 * @author DawNLighX
 */

const Address = require('../../models/Address')

!(async () => {
    // // 创建数据
    // await Address.create({
    //     username: '17631288141', // 关联用户
    //     city: '河北省保定市徐水区',
    //     department: '保险公司家属院',
    //     houseNumber: '东单元202',
    //     name: '奥特曼',
    //     phone: '17631288141'
    // })

    // await Address.create({
    //     username: '17631288141', // 关联用户
    //     city: '河北省沧州市黄骅市',
    //     department: '河北农业大学渤海校区',
    //     houseNumber: '2-435',
    //     name: '奥特曼',
    //     phone: '17631288141'
    // })

    // // 获取全部收货地址
    // const addressList = await Address.find({
    //     username: '17631288141',
    // }).sort({ updatedAt: -1 })

    // console.log('addressList', addressList);

    // // 按收货地址id获取收货地址
    // const id = '69402dfc3e42dc55fc1d4e05'
    // const address = await Address.findById(id)

    // console.log('address', address);

    // 更新收货地址
    const id = '69402dfc3e42dc55fc1d4e08'
    const newData = {
        username: '17631288141',
        city: '河北省保定市莲池区',
        department: '河北农业大学东校区',
        houseNumber: '南门',
        name: '曙',
        phone: '18931227212'
    }
    const addressUpdate = await Address.findOneAndUpdate({
        _id: id,
        username: '17631288141',
    }, newData, {
        new: true // 返回更新之后的最新数据，false为返回更新之前的数据
    })
    
    console.log(addressUpdate)
})()

