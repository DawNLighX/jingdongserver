/**
 * @description 测试数据连接
 * @author DawNLighX
 */

const Shop = require('../../models/Shop')

!(async () => {
    // 创建数据
    await Shop.create({
        name: '711 便利店',
        imgUrl: '/images/shop/711.jpeg',
        sales: 2000,
        expressLimit: 2.99,
        expressPrice: 0.99,
        slogan: '满 69 可用 18 元优惠券'

    })

    await Shop.create({
        name: '京东便利店',
        imgUrl: '/images/shop/jd.jpeg',
        sales: 9000,
        expressLimit: 2.99,
        expressPrice: 0.99,
        slogan: '满 49 可用 12 元优惠券'

    })

    await Shop.create({
        name: '沃尔玛',
        imgUrl: '/images/shop/walmart.jpeg',
        sales: 5000,
        expressLimit: 6.99,
        expressPrice: 0.99,
        slogan: 'VIP享满 89 元送 4 元运费券（每月3张）'
    })

    await Shop.create({
        name: '好想来',
        imgUrl: '/images/shop/hxl.jpeg',
        sales: 300,
        expressLimit: 4.99,
        expressPrice: 0.99,
        slogan: '店铺VIP享 88 折优惠'
    })

    await Shop.create({
        name: '罗森',
        imgUrl: '/images/shop/lawson.jpeg',
        sales: 600,
        expressLimit: 2.69,
        expressPrice: 0.99,
        slogan: '满 69 可用 15 元优惠券'
    })
    // 获取商店信息
})()

