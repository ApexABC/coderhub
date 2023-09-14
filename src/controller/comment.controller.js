const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user
    const result = await commentService.create(content, momentId, id)
    ctx.body = {
      code: 201,
      message: '发表评论成功',
      result
    }
  }
  async reply(ctx, next) {
    const { content, momentId, commentId } = ctx.request.body
    const { id } = ctx.user
    const result = await commentService.reply(content, momentId, id, commentId)
    ctx.body = {
      code: 201,
      message: '回复评论成功',
      result
    }
  }
}

module.exports = new CommentController()
