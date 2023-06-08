//To start a new node project: npm init -> creates package.json file gives access to node package manager "app store"
/*make a file, do npm install express to create node_modules folder and package-lock.json file 
    - put node_module in .gitignore file
  
*/
const PORT = 3000;

// set up dependencies - bring ExpressJS library into our code
const express = require('express'); //bringing express library into our code
const app = express();  //Invoking express function (within it has modules and then methods --> gives us access and
                        // puts these into the variable app)


//handle requests with routes
app.get('/hello', function(req, res) { //.get() is a method returned from the express module that we get access to use
    res.send('hi there!') //when user visits our server + make a GET req + the URL path is '/hello'
}) //if you type a different path into browser, it will return an error. You can add a new route below


//second route
app.get('/goodbye', function(req, res) {
    //res.status(500).json({ error: { message: 'Something went wrong!' } })
    res.send('Bye now!') 
});


// listen on a port (port # should be above 1024)
app.listen(PORT, function () { //includes the PORT
    console.log('server is running');
}) //specify what PORT#. to run this with browser- localhost:3000/hello

// when you run server is should show your console.log statement above

//always shutdown server by hitting ctrl-c. Save your work and re-run your server: node _____ ->folder name
//access server on the browser by pulling up console + clicking network tab, find server under name, click to see details of the request 


/* QUESTIONS
1. explain what a server is-
    something that serves data to a client
    web servers serve data over the internet and use the HTTP protocol

2. explain what a port is
    Port # specifies which program on the computer we want to communicate with

3. Install a ExpressJS server steps-
    create a folder, go into folder,
    'npm install --save express',
    make a file, require express: const express = require('express'); const app = express();
    make a GET request and create routes to handle user requests
    attach a listener for the port

    run a server: node ______ -> file name
    on the browser: 'localhost:PORT#/ROUTE in URL bar

*/

/*ERROR HANDLING
- process where express catches + processes errors that occur (sync and async)
- express has a default error handler that catches errors in route handlers



*/