const { Model } = require('app/modules/common')
const { ObjectId } = require('mongoose').Schema.Types

class UserModel extends Model {

  schema() {
    return {
      firstName: {
        type: String,
        trim: true,
        required: true
      },
      lastName: {
        type: String,
        trim: true,
        required: true
      },
      email: {
        type: String,
        trim: true,
        required: true,
        index: {
          unique: true
        }
      },
      notes: [{
        type: ObjectId, 
        ref: 'Note'
      }]
    }
  }
}

module.exports = UserModel
