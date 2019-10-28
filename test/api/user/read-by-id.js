let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('read-by-id', () => {

      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail with invalid auth', () => {
        return agent.client()
          .get(`/user/${globalAuth.user}`)
          .expect(401)
          .promise()
      })

      it('should read user', async () => {
        const user = await agent.client()
        .get(`/user/${globalAuth.user}`)
        .set('authorization', globalAuth.token)
        .expect(200)
        .promise()
        should.exist(user)
        user.id.should.equal(globalAuth.user)
      })
    })
    describe('update-by-id', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should read user id to update', async () => {
        const user = await agent.client()
        .put(`/user/${globalAuth.user}`)
        .send({
          email: globalAuth.email,
          firstName: globalAuth.firstName,
          lastName: globalAuth.lastName
        })
        .set('authorization', globalAuth.token)
        .expect(200)
        .promise()
        should.exist(user)
        user.id.should.equal(globalAuth.user)
      })
    })
    describe('notes-by-id', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should read user id to read notes', async () => {
        const userNotes = await agent.client()
        .get(`/user/${globalAuth.user}/notes`)
        .set('authorization', globalAuth.token)
        .expect(200)
        .promise()
        should.exist(userNotes)
        userNotes.id.should.equal(globalAuth.user)
        userNotes.should.have.property('notes').with.lengthOf(2)
      })

    })
    describe('post-notes', () => {
      let globalAuth
      let mockNote

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
        mockNote = await mockData.mockNote()
      })

      it('should be able to post notes', async () => {
        const updatedUser = await agent.client()
        .post(`/note`)
        .send(mockNote)
        .set('authorization', globalAuth.token)
        .expect(200)
        .promise()
        should.exist(updatedUser)
        updatedUser.should.have.property('notes').with.lengthOf(3)
      })

    })
  })
})
