const fs = require('fs');
const path = require('path');
const http = require('http');
const PORT = 3200;
var petsPath = path.join(__dirname, 'pets.json');
const petsParsed = JSON.parse(fs.readFileSync(petsPath, 'utf8'));
const petsJSON = JSON.stringify(petsParsed);

const server = http.createServer(function(req, res) {
    const regex = /\/pets+/;
    const negex = /\/pets\/-/;
    const numex = /\/pets\/(\d+)/;

    if (req.method === 'GET' && req.url.search(regex) !== -1) {
        fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
            if (err) {
              console.error(err.stack);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'text/plain');
              res.end('Internal Server Error');
            }      

            if (req.url === '/pets' || req.url === '/pets/'){
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(petsJSON);
            } else {
                const match = req.url.match(numex);
                let digits;
    
                if (req.url.search(negex) !== -1 || !numex.test(req.url)) {
                    digits = undefined;
                } else {
                    digits = match[1];
                }

            if (petsParsed[digits] === undefined) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify(petsParsed[digits]));
            }
            }
          });

    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not Found');
    }
        
});
    
server.listen(PORT, function () {
    console.log('listening on port 3200');
});
