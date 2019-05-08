const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const serialize_error = require('serialize-error');

const app = express();
//var client = new MongoClient('mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01', {useNewUrlParser: true});
var db = require('./db');
var collection = null;

// MongoClient.connect('mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01', { useNewUrlParser: true }, function(err, database){
//
//     if(err) throw err;
//
//     db = database;
//     app.listen(3000);
//
// });

db.connect('mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01', { useNewUrlParser: true }, function(err){

    if(err){
        console.log('unable to connect to Mongo.');
    }else{
        app.listen(3000);
    }

});

app.get("/secret", (req, res) => {

   console.log('request accepted');
   let result;
   var collection = db.get().collection('data');
    collection.findOne({}, {projection: {_id: 0}}).then(data => {
        const encrypt = require('simple-encryptor')(data.key);
       data.message = encrypt.decrypt(data.message);
        console.log(data.message);

        result = data;
        res.status(200).send(JSON.stringify(result));
    }).catch(err => {
        console.log(err);
        next(err);
    });


});


app.use((req, res, next) => {
console.log("inside second middleware.");
    console.log( collection);
    // let response = null;
    // collection.findOne({}).then((data) => {
    //     console.log(data);
    //     response = data;
    // }).catch(err => {
    //     console.log(err);
    //     next(err);
    // });

    //res.status(202).send(JSON.stringify(response));
});


app.use((err, res, next) => {
    res.status(500).send(JSON.stringify(serialize_error(err)));
});

