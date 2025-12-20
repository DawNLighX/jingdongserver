/**
 * @description address router
 * @author DawNLighX
 */

const router = require('koa-router')()
const { 
  createAddress,
  getAddressList,
  getAddressById,
  updateAddress,
  deleteAddress
} = require('../controller/address')
const { SuccessModel, ErrorModel } = require('../res-model/index')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/user/address')

// 错误码常量
const ADDRESS_ERROR = {
  CREATE_FAILED: 10004,
  GET_LIST_FAILED: 10005,
  GET_DETAIL_FAILED: 10006,
  UPDATE_FAILED: 10007,
  DELETE_FAILED: 10008
}

// 创建收货地址
router.post('/', loginCheck, async function (ctx) {
  const userInfo = ctx.session.userInfo
  const username = userInfo.username
  const data = ctx.request.body || {}

  if (!data || Object.keys(data).length === 0) {
    ctx.body = new ErrorModel(ADDRESS_ERROR.CREATE_FAILED, '地址数据不能为空')
    return
  }

  try {
    const newAddress = await createAddress(username, data)

    ctx.body = new SuccessModel(newAddress)
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(ADDRESS_ERROR.CREATE_FAILED, `创建收货地址失败`)
  }
})

// 获取收货地址列表
router.get('/', loginCheck, async function (ctx) {
  const userInfo = ctx.session.userInfo
  const username = userInfo.username

  try {
    const list = await getAddressList(username)

    ctx.body = new SuccessModel(list)
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(ADDRESS_ERROR.GET_LIST_FAILED, `获取收货地址列表失败`)
  }
})

// 获取单个收货地址
router.get('/:id', loginCheck, async function (ctx) {
  const id = ctx.params.id // 与地址中的命名保持一致
  const userInfo = ctx.session.userInfo
  const username = userInfo.username

  try {
    const address = await getAddressById(id, username)

    if (address) {
      ctx.body = new SuccessModel(address)
    } else {
      ctx.body = new ErrorModel(ADDRESS_ERROR.GET_DETAIL_FAILED, `收货地址不存在或无权访问`)
    }
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(ADDRESS_ERROR.GET_DETAIL_FAILED, '获取收货地址失败')
  }
  
})

// 更新收货地址
router.patch('/:id', loginCheck, async function (ctx) {
  const id = ctx.params.id // 与地址中的命名保持一致
  const userInfo = ctx.session.userInfo
  const username = userInfo.username
  const data = ctx.request.body

  if (!data || Object.keys(data).length === 0) {
    ctx.body = new ErrorModel(ADDRESS_ERROR.UPDATE_FAILED, '更新数据不能为空')
    return
  }

  try {
    const address = await updateAddress(id, username, data)

    ctx.body = new SuccessModel(address)
  } catch(ex) {
    console.error(ex)
    ctx.body = new ErrorModel(ADDRESS_ERROR.UPDATE_FAILED, `更新收货地址失败`)
  }
})

// 删除收货地址
router.delete('/:id', loginCheck, async function (ctx) {
  const id = ctx.params.id
  const userInfo = ctx.session.userInfo
  const username = userInfo.username

  try {
    const result = await deleteAddress(id, username)

    if (result) {
      ctx.body = new SuccessModel({
        id: result._id
      })
    } else {
      ctx.body = new ErrorModel(ADDRESS_ERROR.DELETE_FAILED, '收货地址不存在或无权删除')
    }
  } catch(ex) {
    console.error(ex)
    ctx.body = new ErrorModel(ADDRESS_ERROR.DELETE_FAILED, '删除收货地址失败')
  }
})

module.exports = router