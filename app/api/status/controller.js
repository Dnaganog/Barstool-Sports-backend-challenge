const MongoDB = require('../../lib/mongodb.js');

exports.currentStatus = function (req, res) {
  if(MongoDB.readyState === 1) {
    res.status(200).send({
      status: 'OK'
    })
  }
  else res.status(500).send({
    status: 'MongoDB not connected',
    readyState: MongoDB.readyState
  })
}
