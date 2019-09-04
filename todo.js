let express = require('express');
let bodyParser = require('body-parser'); // parse payload of incoming POST requests
let app = express();


//instantiate the database
let db = [];

//viewsPath is required for the response.sendFile function
//__dirname is the directory name of the current module (ie file/project)
let viewsPath = __dirname + '/views/';

//allow express to understand the urlencoded format
app.use(bodyParser.urlencoded({
    extended: false
}));

//parse application/json
app.use(bodyParser.json());

//set up the view engine so express can be able to render ejs templates
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//static assets directories set up
app.use(express.static('images'));
app.use(express.static('css'));


/* 
                GET Requests
*/

//request to the home page
app.get('/', function(req, res) {
    console.log('Home page request');
    //generate the relative path
    let fileName = viewsPath + 'index.html';
    //send index.html back to the client
    res.sendFile(fileName);
});

//add new task to the list
app.get('/newtask', function(req, res) {
    console.log('add new Task request');
    //generate the relative path
    let fileName = viewsPath + 'newtask.html';
    //send index.html back to the client
    res.sendFile(fileName);
});

 app.get('/listtasks', function(req, res) {
    console.log('List all Tasks request');
    //page content should be generated dynamically
    //a copy of the array (db) will be sent to the rendering engine
    res.render('listtasks.html', {
        tasks: db
    });
});

/* 
                POST Requests
*/

// POST method function for adding new tasks to list when user clicks the submit button
app.post('/data', function(req, res) {
    console.log(req.body);
    //bodyParser is responsible for generating the body object
    db.push(req.body);
    //redirect client to the listAllTasks.html page after pushing new task into the db
    res.render('listtasks.html', {
        tasks: db
    });
});

//listen to port number 8080
app.listen(8080);
console.log('server is running: http://localhost:8080/')