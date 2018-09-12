// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectId } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server', err);
    } 
    console.log('Connected to MongoDB server');

    // findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectId("5b98635f8125e0268c239ec2") 
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate(
        {
            _id: new ObjectId("5b95922f8125e0268c236d6c")
        }, {
            $set: {
                name: 'Sammy'
            }, 
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        }
    ).then((result) => {
        console.log(result);
    });



    // db.close();

});
