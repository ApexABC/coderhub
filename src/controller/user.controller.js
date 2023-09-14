const { UPLOAD_PATH } = require('../config/path')
const fileService = require('../service/file.service')
const UserService = require('../service/user.service')
const fs = require('fs')
class UserController {
  async create(ctx, next) {
    const user = ctx.request.body
    const result = await UserService.create(user)
    ctx.body = {
      message: '创建用户成功',
      data: result
    }
  }
  async showAvatarImage(ctx, next) {
    const { userId } = ctx.params
    const avatarInfo = await fileService.queryAvatarWithUserId(userId)
    const { filename, mimetype } = avatarInfo
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new UserController()
