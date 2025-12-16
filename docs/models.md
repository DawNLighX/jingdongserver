# 数据模型设计

## 用户

```js
{
    _id: '用户id',
    username: '手机号', // 唯一标识关联
    password: '密码'
}
```

## 地址

```js
{
    _id: '地址id',
    username: '手机号', // 唯一标识关联
    city: '省市县',
    department: '具体单位/学校/小区地址',
    houseNumber: '门牌号',
    name: '收货人姓名',
    phone: '收货人联系方式', 
}
```

## 商店

```js
{
    _id: '店铺id',
    name: '店铺名称',
    imgUrl: '商店logo地址',
    sales: 2000, // 月售
    expressLimit: 2.99, // 起送价格
    expressPrice: 0.99, // 配送单价
    slogan: '优惠/活动信息等宣传语'
}
```

## 商品

```js
{
    _id: '商品',
    shopId: '店铺id',
    name: '商品名称',
    imgUrl: '商品logo地址',
    sales: 130, // 月售
    price: 4.61, // 现价
    oldPrice: 5.88 // 原价
    tabs: ['all', 'seckill', 'fruit']
}
```

## 订单

```js
{
    username: '用户id',
    _id: "订单 id", // 示例 202505300880
    shopId: "3", // 需与商店绑定，如商店id发生变化，若为单纯id改变则可以实时更新，若商店已关店（注销）则保留当时状态
    shopName: "沃尔玛", // 只与下单时数据状态有关，不能随系统变化
    isCanceled: false, // 订单是否被取消
    address: { // 只与下单时数据状态有关，不能随系统变化
        username: '用户id',
        city: "厦阳市", // 省市县
        department: "laboris cupidatat in dolore sunt",
        houseNumber: "8-07",
        name: "老俊杰",
        phone: "72114782883"
    },
    products: [ // 只与下单时数据状态有关，不能随系统变化
        {
            orderSales: 8,
            product: {
                tabs: ['all', 'seckill']
                shopId: "3", // 需与商店绑定，如商店id发生变化，若为单纯id改变则可以实时更新，若商店已关店（注销）则保留当时状态
                name: "番茄250g/斤",
                imgUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=800&fit=crop&crop=center",
                sales: 7,
                price: 4.61,
                oldPrice: 4.99
            }
        }
    ]
}
```