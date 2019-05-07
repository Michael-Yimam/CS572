/**
 * dependency
 * @type {createApplication}
 */
const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const serialize_error = require('serialize-error');

/**
 * initialization
 */
const app = express();
const port = 3000;
const studentGrades = [];
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });



/**
 * setup
 */
app.set('x-powered-by', false);
app.set('strict routing', false);



app.use('/grades', (req, res, next) => {

    res.contentType('application/json');
    res.setHeader('Cache-Control', 'private, maxage=0');
    next();

});


/**
 * setup logger
 */
app.use(morgan('combined', { stream: accessLogStream }));



/**
 * middleware to send all student grades to client
 */
app.get('/grades', (req, res, next) => {

    try{
        res.status(200).send(JSON.stringify(studentGrades));
    }catch(err){
        err.message = "Error encountered when stringify-ing student grades in get verb";
        next(err);
    }

});



/**
 * middleware to send student grade by id
 */
app.get('/grades/:id', (req, res, next) => {

    let temp = studentGrades.filter( std => {
       return (std.id == req.params.id);
    });
    res.status(200).send(JSON.stringify(temp));

});



/**
 * middleware to parse post body
 */
app.use('/grades', bodyParser.json(), (req, res, next) => {
    next();
});



/**
 *  middleware to insert new student grade if it doesn't exist already
 */
app.post('/grades', (req, res, next) => {

    try{

        for(let student of req.body){
            studentGrades.push(student);
        }

        res.status(200).send(JSON.stringify("Data successfully inserted."));
    }catch(err){
        err.message = "Error occurred while pushing student grades to memory";
        next(err);
    }

});



app.put('/grades', (req, res, next) => {

    try{

        let length = studentGrades.length;

        for(let i = length-1; i >= 0; --i){
            if(studentGrades[i].id == req.body[0].id){
                studentGrades[i] = req.body[0];
                res.status(200).send(JSON.stringify(
                    {message: "Updated successfully.", newData: studentGrades[i]}
                ));
                return;
            }
        }

        res.status(204).send(JSON.stringify("Update Unsuccessful."));
    }catch(err){
        err.message = "Error occurred while updating a student's grade.";
        next(err);
    }

});
/**
 * error handling middleware
 */
app.use((err, req, res, next) => {
    res.status(500).send(JSON.stringify(serialize_error(err)));
});



/**
 * middleware to verify valid JSON is passed
 */
app.use((req, res, next) => {

    try{
        let student = req.body;
        //console.log("data: " + JSON.stringify(student));
        for(let st of student){
            console.log(st);
        }
    }catch(err){
        console.log('error happened');
        res.status(500).end("error happend. sorry!");
    }
    res.status(200).end('its okay');
});



// listen to port
app.listen(port);