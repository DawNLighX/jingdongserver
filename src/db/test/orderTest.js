/**
 * @description 测试数据连接
 * @author DawNLighX
 */

const Order = require('../../models/Order')
const Address = require('../../models/Address')
const Product = require('../../models/Product')

!(async () => {

    const requestBody = {
        addressId: '69402dfc3e42dc55fc1d4e08',
        shopId: '6940c3dee20c06c55ad7443a',
        shopName: '京东便利店',
        isCanceled: false,
        products: [
            {
                id: '6940c59dd7f2e97ba1bdd021',
                num: 3
            },
            {
                id: '6940c59dd7f2e97ba1bdd024',
                num: 21
            }
        ]
    }

    const address = await Address.findById(requestBody.addressId)

    const productId = requestBody.products.map(p => p.id) // ['6940c59dd7f2e97ba1bdd021', '6940c59dd7f2e97ba1bdd024']
    const productList = await Product.find({
        shopId: requestBody.shopId,
        _id: {
            $in: productId
        }
    })
    
    const productListWidthSales = productList.map(p => {
        const id = p._id.toString()

        const filterProducts = requestBody.products.filter(item => item.id === id)
        if (filterProducts.length === 0 ) {
            throw Error('no data here')
        }

        return {
            product: {
                shopId: p.shopId,
                name: p.name,
                imgUrl: p.imgUrl,
                sales: p.sales,
                price: p.price,
                oldPrice: p.oldPrice,
            },
            orderSales: filterProducts[0].num
        }
    })
    console.log(address)

    await Order.create({
        username: '17631288141',
        shopId: requestBody.shopId,
        shopName: requestBody.shopName,
        isCanceled: requestBody.isCanceled,
        address: {
            username: address.username,
            city: address.city,
            department: address.department,
            houseNumber: address.houseNumber,
            name: address.name,
            phone: address.phone,
        },
        products: productListWidthSales
    })
})()

