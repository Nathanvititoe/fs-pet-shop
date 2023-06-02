const fs = require('fs');
const path = require('path');
const http = require('http');
const PORT = 3200;
var petsPath = path.join(__dirname, 'pets.json');
const pets = JSON.parse(fs.readFileSync(petsPath, 'utf8'));
const petsJSON = JSON.stringify(pets);

const server = http.createServer(function(req, res) {
    const regex = /\/pets/;
    const negex = /\/pets\/-/;

    if (req.method === 'GET' && req.url.search(regex) !== -1) {
        fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
            if (err) {
              console.error(err.stack);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'text/plain');
              res.end('Internal Server Error');
            }      

            if (req.url === '/pets'){
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(petsJSON);
            } else {
            const request = req.url.length-1;
            const index = parseInt(req.url[request]);
            if (pets[index] === undefined || req.url.search(negex) !== -1) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify(pets[index]));
            }
            }
          });
    } else {
        res.end('string not working')
    }
        
});
    
server.listen(PORT, function () {
    console.log('listening on port 3200');
});
