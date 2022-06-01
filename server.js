const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const bookRouter = require('./api/routes/book-router');
const feedbackRouter = require('./api/routes/feedback-router');

//create an express object. Express is the node library and we create a new object
//this object is our "Webserver"
const app = express();

//is the a port in the environment variable, when yes use this when not use 30000
// because it is always diffrent and so we use environment variable
//Operating System independent
const port = process.env.PORT ?? 30000;

// Serving static files from folder 'files'
//Why path.join ??? Folder config is not the same on all machine, so we use this one
app.use(express.static(path.join(__dirname, 'files')));

// Parse urlencoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true })); 

// Parse JSON bodies (from requests)
app.use(bodyParser.json()); 

// Include the book routes
app.use('/api', bookRouter);

// Include the feedback routes
app.use('/api', feedbackRouter);

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`)
    }
});

