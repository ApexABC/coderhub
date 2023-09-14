const { create } = require('../service/file.service')
const { updateUserAvatar } = require('../service/user.service')
const { SERVE_PORT, SERVE_HOST } = require('../config/serve')
class FileController {
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user
    const result = await create(filename, mimetype, size, id)
    // 将头像的地址信息，保存到user表中
    const avatarUrl = `${SERVE_HOST}:${SERVE_PORT}/users/avatar/${id}`
    const result2 = await updateUserAvatar(avatarUrl, id)
    ctx.body = {
      code: 201,
      message: '头像上传成功',
      data: avatarUrl
    }
  }
}

module.exports = new FileController()
