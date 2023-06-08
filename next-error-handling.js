// set up dependencies - bring ExpressJS library into our code
const express = require('express');
const app = express();



app.get('/:num', (req, res, next) => {
    const num = req.params.num
    if (!Number(num)) {
      next({ status: 500, message: 'Please enter a number!' })
    } else {
      res.json({ message: `${num} is a great number.` })
    }
  })
  
  app.use((err, req, res, next) => {
    console.log('i got called')
    res.status(err.status).json({ error: err })
  })


// listen on a port (port # should be above 1024)
app.listen(3000, function () {
    console.log('server is running');
}) //specify what PORT#. to run this with browser- localhost:3000/hello
