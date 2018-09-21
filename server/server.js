const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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
        } 
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        } 
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });


});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
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
