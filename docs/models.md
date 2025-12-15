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