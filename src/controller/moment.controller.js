const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const { content } = ctx.request.body
    const { id } = ctx.user
    // 保存到数据库
    const result = await momentService.create(content, id)
    console.log(content, id)
    ctx.body = {
      code: 201,
      message: '创建动态成功',
      result
    }
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query
    // 从数据库中查询动态列表
    const result = await momentService.queryList(offset, size)
    ctx.body = {
      code: 200,
      result
    }
  }
  async detail(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.getMomentById(momentId)
    ctx.body = {
      code: 200,
      result: result[0]
    }
  }
  async patch(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const result = await momentService.updata(content, momentId)
    ctx.body = {
      code: 201,
      message: '修改动态成功',
      result
    }
  }
  async deleteMoment(ctx, next) {
    const { momentId } = ctx.params
    const result = await momentService.deleteMoment(momentId)
    ctx.body = {
      code: 200,
      message: '删除动态成功',
      result
    }
  }
  // 给moment添加label
  async addLabels(ctx, next) {
    const labels = ctx.labels
    const { momentId } = ctx.params
    // 将moment_id和label_id 添加到moment_label
    try {
      for (const label of labels) {
        const isExists = await momentService.hasLabel(momentId, label.id)
        if (isExists) continue
        const result = await momentService.addLabel(momentId, label.id)
      }
      ctx.body = {
        code: 200,
        message: '动态添加标签成功'
      }
    } catch (error) {
      ctx.body = {
        code: -3001,
        message: '动态添加标签失败'
      }
    }
    // ctx.body = {
    //   code: 200,
    //   message: '动态添加标签成功'
    // }
  }
}
module.exports = new MomentController()
