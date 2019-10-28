const userService = require('app/modules/user')
const notesService = require('app/modules/notes')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const user = await userService.findById(req.params.id, 'notes')
  .populate('notes')
  res.status(200).send(user)
}

/**
 * @method write
 */
exports.write = async (req, res) => {
  const newUserNote = await notesService.create({
    title: req.body.title,
    message: req.body.message
  })
  const user = await userService.findById(res.authStorage.user)
  .populate('notes')
  user.notes.push(newUserNote)
  const updatedUserNotes = await user.save()
  res.status(200).send(updatedUserNotes)
}
