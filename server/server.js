var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        } else {
            res.send({todo});
        }
    }).catch((e) => {
        res.status(400).send();
    })
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = { app };

//////// EXAMPLES ////////
// var newTodo = new Todo({
//     text: 'Edit video'
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

// var newUser = new User({
//     // email: 'jake@jake.jake'
//     email: ''
// });

// newUser.save().then((doc) => {
//     console.log('Saved user', doc);
// }).catch((e) => {
//     console.log('Unable to save user', e);
// })

// newTodo2.save().then((doc) => {
//     console.log('Saving todo', doc);
// }).catch((e) => {
//     console.log('Unable to save todo', e);
// });
