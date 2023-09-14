const UserService = require('../service/user.service')
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require('../config/error')
const md5password = require('../utils/md5-passwod')
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  // 判断name是否存在
  const users = await UserService.findUserByName(name)
  if (users.length) {
    return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx)
  }
  await next()
}
// 加密密码
const handlePassword = async (ctx, next) => {
  // 取出密码
  const { password } = ctx.request.body
  // 加密
  ctx.request.body.password = md5password(password)
  await next()
}
module.exports = {
  verifyUser,
  handlePassword
}
