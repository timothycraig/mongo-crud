
const assert  = require('assert');
const User    = require('../src/user');

describe('Virtual types', () => {

  it('noteCount returns number of notes', (done) => {
    const joe = new User({
      name: 'Joe',
      notes: [{ title: 'NoteTitle'}]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(joe.noteCount === 1);
        done();
      });
  });
});
