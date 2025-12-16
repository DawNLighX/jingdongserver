/**
 * @description 测试数据连接
 * @author DawNLighX
 */

const Product = require('../../models/Product')

!(async () => {
    // // 创建数据
    // await Product.create({
    //     shopId: '6dsg6f8sd97g98r6g89df6g8s78',
    //     name: '番茄250g/斤',
    //     imgUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=800&fit=crop&crop=center',
    //     sales: 130,
    //     price: 4.61,
    //     oldPrice: 5.88,
    //     tabs: ['all', 'seckill', 'fruit']
    // })

    // await Product.create({
    //     shopId: 'bf8ds7h889787dyg9h7d7dgf87f',
    //     name: '苹果250g/斤',
    //     imgUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&h=800&fit=crop&crop=center',
    //     sales: 210,
    //     price: 4.99,
    //     oldPrice: 6.99,
    //     tabs: ['all', 'seckill', 'fruit']
    // })

    // 获取商品信息

    const list = await Product.find({
        tabs: {
            $in: 'seckill'
        }
    })

    console.log('list', list)

})()

