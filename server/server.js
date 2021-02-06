const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
// set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up the listener - Port 5000
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

// Set up an array to store the input objects from client
let calculations = [];

function newCalc(input) {
  calculations.push(input);
  return true;
}

/*
* POST Structure

{
  calcToAdd: {
    "numOne": "12",
    "numTwo": "12",
    "operator": "addBtn"
  }
}

*/

app.post('/inputs', (req, res) => {
  let calculation = req.body.calcToAdd;
  newCalc(calculation);
  console.log('calculations array', calculations);
  res.sendStatus(200); // means OK!
});
