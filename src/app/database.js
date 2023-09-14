const mysql = require('mysql2')
const connectionPoll = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'coderhub',
  user: 'root',
  password: '123456789',
  connectionLimit: 5
})
// 获取连接是否成功
connectionPoll.getConnection((err, connection) => {
  if (err) {
    console.log('数据库连接失败', err)
    return
  }
  connection.connect((err) => {
    if (err) {
      console.log('数据库交互失败', err)
    } else {
      console.log('数据库连接成功')
    }
  })
})
const connection = connectionPoll.promise()

module.exports = connection
