const fs = require('fs');
const path = require('path');
const http = require('http');

const express = require('express'); //bringing express library into our code
const app = express();
app.use(express.json());


const PORT = 3200;

const petPath = path.join(__dirname, 'pets.json');

app.get('/pets', (req, res)=>{
    fs.readFile(petPath, 'utf8', (err, petJSON)=>{
        if(err) {
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.send('Internal Server Error');
          }

        const parsed = JSON.parse(petJSON);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.send(parsed);
    })
})

app.get('/pets/:id', (req, res)=>{
    fs.readFile(petPath, 'utf8', (err, petJSON)=>{
        if (err) {
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.send('Internal Server Error');
        }
        const pets = JSON.parse(petJSON);
        let id = req.params.id;
        id = parseInt(id);
       
        if (Number.isInteger(id) && id >= 0 && id < pets.length) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.send(pets[id]);
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 404;
            res.send('Not Found');
        }        
    })
})

app.post('/pets', (req, res) => {
    fs.readFile(petPath, 'utf8', (err, petJSON)=>{
        if (err) {
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
        }
    //console.log(req.body)
        const pet = req.body;
        const pets = JSON.parse(petJSON);

            if (
                !pet.hasOwnProperty('age') || !pet.hasOwnProperty('kind') ||
                !pet.hasOwnProperty('name') || pet['name'] === "" ||
                pet['age'] === "" || pet['kind'] === ""
               ) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 400;
                res.send('Bad Request');
            } else {
                pets.push(pet);
                fs.writeFileSync(petPath, JSON.stringify(pets, null, 2), 'utf8'); 
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(pet);
            }
        
    });
});

app.delete('/pets/:id', (req, res) => {
    fs.readFile(petPath, 'utf8', (err, petJSON)=>{
        if (err) {
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.send('Internal Server Error');
        }
        const pets = JSON.parse(petJSON);
        let id = req.params.id;
        id = parseInt(id);

        if (Number.isInteger(id) && id >= 0 && id < pets.length) {
            removedPet = pets.splice(id, 1)[0];
            fs.writeFileSync(petPath, JSON.stringify(pets, null, 2), 'utf8'); 
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(removedPet);
                    //console.log(removedPet);
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 400;
            res.send('Not Found');
            //console.error('Enter a valid pet entry'); 
            //process.exit(1);
        }
    });
});


app.listen(3200, function () { 
    console.log('server is running');
})