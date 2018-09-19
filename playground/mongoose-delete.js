const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove


// Todo.findByIdAndRemove
Todo.findByIdAndRemove('5ba2aa2f5948ceb53633cc5f').then((todo) => {
    console.log(todo);
});

