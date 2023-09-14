const app = require('../app')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  OPERATION_IS_NOT_ALLOWED
} = require('../config/error')
app.on('error', (error, ctx) => {
  let code = 0
  let message = ''
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名或密码不能为空'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      message = '用户名已经存在，请输入新的用户名'
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = '账号不存在，请重试'
      break
    case PASSWORD_IS_INCORRENT:
      code = -1004
      message = '密码错误，请重试'
      break
    case UNAUTHORIZATION:
      code = -1005
      message = 'token过期或错误，没有权限访问'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -1006
      message = '不允许此操作，动态非该用户发送。'
      break
  }
  ctx.body = { code, message }
})
