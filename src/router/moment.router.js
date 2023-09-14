const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const momentController = require('../controller/moment.controller')
const { verifyMomentPermission, verifyPermission } = require('../middleware/permission.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment' })
// 增
momentRouter.post('/', verifyAuth, momentController.create)
// 查
momentRouter.get('/', momentController.list)
momentRouter.get('/:momentId', momentController.detail)
// 改
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, momentController.patch)
// 删
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, momentController.deleteMoment)
// 添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, momentController.addLabels)
module.exports = momentRouter
