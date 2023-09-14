const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWORD_IS_INCORRENT, UNAUTHORIZATION } = require('../config/error')
const { PUBLICK_KEY } = require('../config/screct')
const userService = require('../service/user.service')
const md5password = require('../utils/md5-passwod')
const jwt = require('jsonwebtoken')
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 判断用户名或密码是否为空
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  // 查询用户是否在数据库中存在
  const users = await userService.findUserByName(name)
  if (!users[0]) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }
  // 查询数据库中密码和用户传递的密码是否一致
  if (users[0].password !== md5password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
  }
  ctx.user = users[0]
  await next()
}
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  // 验证token是否有效
  try {
    const result = jwt.verify(token, PUBLICK_KEY, {
      algorithms: ['RS256']
    })
    // 将token保留下来
    ctx.user = result
    await next()
  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}
module.exports = {
  verifyLogin,
  verifyAuth
}
