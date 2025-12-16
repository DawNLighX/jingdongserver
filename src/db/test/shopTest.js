/**
 * @description 测试数据连接
 * @author DawNLighX
 */

const Shop = require('../../models/Shop')

!(async () => {
    // 创建数据
    await Shop.create({
        name: '711 便利店',
        imgUrl: 'https://i.ibb.co/hFbyLJtJ/711.jpg',
        sales: 2000,
        expressLimit: 2.99,
        expressPrice: 0.99,
        slogan: '满 69 可用 18 元优惠券'

    })

    await Shop.create({
        name: '京东便利店',
        imgUrl: 'https://i.ibb.co/MDGMbdcj/image.png',
        sales: 9000,
        expressLimit: 2.99,
        expressPrice: 0.99,
        slogan: '满 49 可用 12 元优惠券'

    })

    // 获取商店信息
})()

