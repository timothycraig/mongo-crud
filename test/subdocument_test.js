
const assert  = require('assert');
const User    = require('../src/user');

describe('Subdocuments', () => {

  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      notes: [{ title: 'NoteTitle' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.notes[0].title === 'NoteTitle');
        done();
      });
  });

  it('Can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      notes: []
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.notes.push({ title: 'New Note' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.notes[0].title === 'New Note');
        done();
      });
  });

  it('Can delete subdocuments from an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      notes: [{ title: 'New Title'}]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        const note = user.notes[0];
        note.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.notes.length === 0);
        done();
      });
  });
});
