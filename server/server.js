var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    }, 
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

// var newTodo = new Todo({
//     text: 'cook dinner'
// })

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }).catch((e) => {
//     console.log('Unable to save todo', e);
// })

// var newTodo2 = new Todo({
//     text: 'Go to gym',
//     completed: true,
//     completedAt: 1000
// });

// newTodo2.save().then((doc) => {
//     console.log('Saving todo', doc);
// }).catch((e) => {
//     console.log('Unable to save todo', e);
// });
