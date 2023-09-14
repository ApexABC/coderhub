const app = require('./app')
const { SERVE_PORT } = require('./config/serve')
require('./utils/handle-error')
app.listen(SERVE_PORT, () => {
  console.log('http://localhost:2000')
})
