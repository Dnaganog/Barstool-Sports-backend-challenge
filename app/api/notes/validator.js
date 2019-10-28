const { Validator } = require('app/api/common')

class NoteValidator extends Validator {

  write(req) {
    req.checkBody('title').optional().len(1, 64)
    req.checkBody('message').optional().len(1, 280)
    return this.validate(req)
  }
}

module.exports = new NoteValidator()
