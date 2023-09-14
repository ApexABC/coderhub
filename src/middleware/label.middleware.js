const { queryLabelByName, create } = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body
  const newLabelObj = []
  for (const name of labels) {
    const result = await queryLabelByName(name)
    const labelObj = { name }
    if (result) {
      labelObj.id = result.id
    } else {
      const inserResult = await create(name)
      labelObj.id = inserResult.insertId
    }
    newLabelObj.push(labelObj)
  }
  ctx.labels = newLabelObj
  await next()
}
module.exports = {
  verifyLabelExists
}
