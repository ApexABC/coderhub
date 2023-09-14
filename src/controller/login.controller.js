const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/screct')
class LoginController {
  sign(ctx, next) {
    const { name, id } = ctx.user
    // 颁发令牌
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: 'RS256'
    })
    ctx.body = {
      id,
      name,
      token
    }
  }
  test(ctx, next) {
    ctx.body = '验证通过'
  }
}

module.exports = new LoginController()
