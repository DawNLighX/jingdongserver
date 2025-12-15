# API（接口）设计

## 注册

### url 

`/api/user/register`

### method 

`POST`

### request body

```js
{
    username: '11122223333',
    password: '123AbC'
}
```

### response body

```js
{
    errno: 0,
    message: 'errno != 0 的话，错误信息'
}
```

## 登录

### url

`/api/user/login`

### method 

`POST`

### request body

```js
{
    username: '11122223333',
    password: '123AbC'
}
```

### response body

```js
{
    errno: 0,
    message: 'errno != 0 的话，错误信息'
}
```

## 获取收货地址列表

### url

`/api/user/address`

### method 

`GET`

### request body

无

### response body

```js
{
    errno: 0,
    data: [
        {
            _id: '收货地址id',
            city: '北京',
            department: 'xxx小区',
            houseNumber: '7-702',
            name: '张三',
            phone: '11122223333', 
            createdAt: Date,
            updatedAt: Date
        }
    ],
    message: 'errno != 0 的话，错误信息'
}
```

## 获取单个收货地址

### url

`/api/user/address/:id`（`:id` 是一个动态参数，服务端可获取具体的参数值）

示例： `/api/user/address/1`、`/api/user/address/10000001`

### method 

`GET`

### request body

无

### response body

```js
{
    errno: 0,
    data: {
        _id: '收货地址id',
        city: '北京',
        department: 'xxx小区',
        houseNumber: '7-702',
        name: '张三',
        phone: '11122223333', 
        createdAt: Date,
        updatedAt: Date
    },
    message: 'errno != 0 的话，错误信息'
}
```

## 创建收货地址

### url

`/api/user/address`

### method 

`POST`

### request body

```js
{
    city: '北京',
    department: 'xxx小区',
    houseNumber: '7-702',
    name: '张三',
    phone: '11122223333'
}
```

### response body

```js
{
    errno: 0,
    message: 'errno != 0 的话，错误信息'
}
```

## 更新收货地址

### url

`/api/user/address/:id`

### method 

`PATCH`

### request body

```js
{
    city: '北京',
    department: 'xxx小区',
    houseNumber: '7-702',
    name: '张三',
    phone: '11122223333'
}
```

### response body

```js
{
    errno: 0,
    message: 'errno != 0 的话，错误信息'
}
```

## 附近（热门）店铺

### url

`/api/shop/hot-list`

### method 

`GET`

### request body

无

### response body

```js
{
    errno: 0,
    data: [
        {
            _id: '店铺id',
            name: '711 便利店',
            imgUrl: '',
            sales: 2000, // 月售
            expressLimit: 2.99, // 起送价格
            expressPrice: 0.99, // 配送单价
            slogan: '满 69 可用 18 元优惠券'
        }
    ],
    message: 'errno != 0 的话，错误信息'
}
```

### url

`/api/user/address/:id`

### method 

`PATCH`

### request body

```js
{
    city: '北京',
    department: 'xxx小区',
    houseNumber: '7-702',
    name: '张三',
    phone: '11122223333'
}
```

### response body

```js
{
    errno: 0,
    message: 'errno != 0 的话，错误信息'
}
```

## 店铺详情

### url

`/api/shop/:id`

### method 

`GET`

### request body

无

### response body

```js
{
    errno: 0,
    data: {
        _id: '店铺id',
        name: '711 便利店',
        imgUrl: '',
        sales: 2000, // 月售
        expressLimit: 2.99, // 起送价格
        expressPrice: 0.99, // 配送单价
        slogan: '满 69 可用 18 元优惠券'
    },
    message: 'errno != 0 的话，错误信息'
}
```

## 店铺商品列表

### url

`/api/shop/:id/products`

### method 

`GET`

### request body

无

### response body

```js
{
    errno: 0,
    data: [
        {
            _id: '1',
            name: '番茄250g/斤',
            imgUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=800&fit=crop&crop=center',
            sales: 130,
            price: 4.61,
            oldPrice: 5.88
        }
    ],
    message: 'errno != 0 的话，错误信息'
}
```

## 创建订单

### url

`/api/order`

### method 

`POST`

### request body

```js
{
    addressId: '收货地址',
    shopId: '商品id',
    shopName: '沃尔玛',
    isCanceled: false,
    products: [
        {
            id: '商品id',
            num: 1
        }
    ]
}
```

### response body

```js
{
    errno: 0,
    data: {
        _id: '订单id'
    },
    message: 'errno != 0 的话，错误信息'
}
```

## 获取订单

### url

`/api/order`

### method 

`GET`

### request body

无

### response body

```js
{
    errno: 0,
    data: [
        {
            orderId: "202505300880",
            address: {
                city: "厦阳市",
                department: "laboris cupidatat in dolore sunt",
                houseNumber: "8-07",
                name: "老俊杰",
                phone: "72114782883"
            },
            shopId: "3",
            shopName: "沃尔玛",
            isCanceled: false,
            products: [
                {
                    orderSales: 8,
                    product: {
                        name: "番茄250g/斤",
                        img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=800&fit=crop&crop=center",
                        price: 4.61,
                        sales: 7
                    }
                }
            ]
        },
    ],
    message: 'errno != 0 的话，错误信息'
}
```

## 获取热门搜索

### url

`/api/search/hot-words`

### method 

`GET`

### request body

无

### response body

```js
{
    errno: 0,
    data: [
        '水果',
        '山姆会员超市',
        '7-11便利店',
        '罗森',
        '大盘鸡盖浇面',
        '生日鲜花',
        '香槟玫瑰',
        '肯德基',
        '生椰拿铁',
        '焦糖海盐冰震拿铁'
    ],
    message: 'errno != 0 的话，错误信息'
}
```
