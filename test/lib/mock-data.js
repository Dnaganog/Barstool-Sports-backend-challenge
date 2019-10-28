const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')
const authService = require('app/modules/auth')
const userService = require('app/modules/user')
const notesService = require('app/modules/notes')
const { Schema } = require('mongoose')

class MockData {

  /**
   * @method uuid
   */
  uuid() {
    return uuid(...arguments)
  }

  /**
   * @method hash
   */
  hash(input) {
    return bcrypt.hash(input, authService.SALT_WORK_FACTOR)
  }

  /**
   * @method mockAuthAndUser
   */
  async mockAuthAndUser(options = {}) {
    const user = await this.mockUser(options)
    const auth = await this.mockAuth({ ...options, user: user.id })
    return auth
  }

  /**
   * @method mockAuth
   */
  mockAuth(options = {}) {
    const data = Object.assign({
      token: uuid(),
      user: uuid(),
      password: uuid()
    }, options)
    return authService.create(data)
  }

  /**
   * @method mockNote
   */
  mockNote(options = {}) {
    return Object.assign({
      title: `${uuid()}`,
      message: `${uuid()}`
    }, options)
  }

  /**
   * @method mockUser
   */
  async mockUser(options = {}) {
    let notes = await Promise.all([
      notesService.create(this.mockNote()),
      notesService.create(this.mockNote())
    ])
    const data = Object.assign({
      email: `${uuid()}@test.com`,
      firstName: 'John',
      lastName: 'Doe',
      notes
    }, options)
    return userService.create(data)
  }
}

module.exports = new MockData()
