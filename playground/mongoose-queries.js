const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5ba15604527a340b21b7cf3411';

// if (!ObjectID.isValid(id)) {
//     console.log("Id not valid");
// }

// Todo.find({_id: id}).then((todos) => {
//     console.log("Todos:", todos);
// });

// Todo.findOne({_id: id}).then((todo) => {
//     console.log("Todo:", todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found.');
//     }
//     console.log("Todo by Id:", todo);
// }).catch((e) => {
//     console.log(e);
// });

var uid = '5b9ed4cccf41ffc02f905ca3';

User.findById(uid).then((user) => {
    if (!user) {
        return console.log('User ID not found');
    }
    console.log("User:", user);
}).catch((e) => console.log(e));



