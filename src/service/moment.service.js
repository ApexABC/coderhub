const connection = require('../app/database')
class MomentService {
  async create(content, userId) {
    const statement = 'INSERT INTO `moment` (content,user_id) VALUE (?,?);'
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }
  async queryList(offset = 0, size = 10) {
    const statement = `SELECT m.id id ,m.content content ,m.createAt createAt,
    JSON_OBJECT('id',u.id,'name',u.name) user,
    (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
    (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
    FROM moment m LEFT JOIN user u ON m.user_id = u.id
    LIMIT 10 OFFSET 0;`
    const [result] = await connection.execute(statement, [String(size), String(offset)])
    return result
  }
  async getMomentById(momentId) {
    const statement = `SELECT m.id id ,m.content content ,m.createAt createAt,
    JSON_OBJECT('id',u.id,'name',u.name,'userAvatar',u.avatar_url) user,
    (
      SELECT
      JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,
      'user',JSON_OBJECT('userId',cu.id,'userName',cu.name)))
      FROM comment c
      LEFT JOIN user cu ON c.user_id = cu.id
      WHERE c.moment_id = m.id
    ) comments,
    (
      JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name))
    ) labels
    FROM moment m 
    LEFT JOIN user u ON m.user_id = u.id
    LEFT JOIN moment_label ml ON ml.moment_id = m.id
    LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id = ?
    GROUP BY m.id;`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
  async updata(content, id) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, id])
    return result
  }
  async deleteMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return !!result.length
  }
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result
  }
}

module.exports = new MomentService()
