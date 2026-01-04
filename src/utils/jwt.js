/**
 * @description JWT token 工具函数
 * @author DawNLighX
 */

const jwt = require('jsonwebtoken')

// 密钥（生产环境应该使用环境变量）
const JWT_SECRET = 'your-secret-key-!Xli3@2851#6HBN$DBHX%Q'
const REFRESH_TOKEN_SECRET = 'your-refresh-token-secret-!Xli3@2851#6HBN$DBHX'

/**
 * 生成 access token
 * @param {Object} payload - token 载荷数据
 * @param {number} expiresIn - 过期时间（秒），默认 1 小时
 * @returns {string} token
 */
function generateAccessToken(payload, expiresIn = 3600) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

/**
 * 生成 refresh token
 * @param {Object} payload - token 载荷数据
 * @param {number} expiresIn - 过期时间（秒），默认 7 天
 * @returns {string} token
 */
function generateRefreshToken(payload, expiresIn = 7 * 24 * 60 * 60) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn })
}

/**
 * 验证 access token
 * @param {string} token - token
 * @returns {Object|null} 解析后的 payload，验证失败返回 null
 */
function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    console.error('Access token 验证失败:', err.message)
    return null
  }
}

/**
 * 验证 refresh token
 * @param {string} token - token
 * @returns {Object|null} 解析后的 payload，验证失败返回 null
 */
function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET)
  } catch (err) {
    console.error('Refresh token 验证失败:', err.message)
    return null
  }
}

/**
 * 刷新 access token
 * @param {string} refreshToken - refresh token
 * @returns {Object|null} 返回新的 access token 和 refresh token，验证失败返回 null
 */
function refreshAccessToken(refreshToken) {
  const payload = verifyRefreshToken(refreshToken)
  if (!payload) {
    return null
  }

  // 移除过期时间相关的字段
  delete payload.iat
  delete payload.exp

  const newAccessToken = generateAccessToken(payload)
  const newRefreshToken = generateRefreshToken(payload)

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  refreshAccessToken
}
