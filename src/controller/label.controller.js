const labelService = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    const result = await labelService.create(name)
    ctx.body = {
      code: 201,
      message: '添加标签成功',
      result
    }
  }
  async list(ctx, next) {
    const result = await labelService.list()
    ctx.body = {
      code: 200,
      message: '查询成功',
      result
    }
  }
}

module.exports = new LabelController()
