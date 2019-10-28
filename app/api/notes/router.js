const controller = require('./controller')
const auth = require('./auth')
const validator = require('./validator')

module.exports = router => {
  router.get('/user/:id/notes', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await controller.read(req, res)
  })

  router.post('/note', async (req, res) => {
    await auth.requiresLoginAndStoresUser(req, res)
    await validator.write(req)
    await controller.write(req, res)
  })
}