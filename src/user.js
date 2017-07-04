
const mongoose    = require('mongoose');
const NoteSchema  = require('./note');
const Schema      = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  notes: [NoteSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('noteCount').get(function() {
  return this.notes.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
