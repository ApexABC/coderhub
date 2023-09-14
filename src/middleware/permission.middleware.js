const { OPERATION_IS_NOT_ALLOWED } = require('../config/error')
const permissionService = require('../service/permission.service')

// const verifyMomentPermission = async (ctx, next) => {
//   const { id } = ctx.user
//   const { momentId } = ctx.params
//   const isPermission = await permissionService.verifyMoment(id, momentId)
//   if (!isPermission) {
//     return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
//   }
//   await next()
// }
const verifyPermission = async (ctx, next) => {
  const { id } = ctx.user
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace('Id', '')
  const isPermission = await permissionService.checkResource(resourceName, resourceId, id)
  if (!isPermission) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }
  await next()
}

module.exports = {
  // verifyMomentPermission,
  verifyPermission
}
