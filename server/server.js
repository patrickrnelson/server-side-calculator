const express = require('express');
const bodyParser = require('body-parser');
const calculations = require('./modules/calculations');

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

function newCalc(input) {
  calculations.array.push(input);
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

// get the inputs
// do the calculation
// add the answer to the object
// push the object to the array

app.post('/inputs', (req, res) => {
  // inputs
  let calculation = req.body.calcToAdd;
  // crunch the numbers
  let answer = calculations.crunchNumbers(calculation);
  // console.log('Testing the calc', answer);
  // add the answer to the object
  calculation = {
    numOne: calculation.numOne,
    numTwo: calculation.numTwo,
    operator: calculation.operator,
    answer: answer,
  };
  // push the object to the array
  newCalc(calculation);
  console.log('New array', calculations.array);
  res.sendStatus(200); // means OK!
});

app.get('/inputs', (req, res) => {
  res.send(calculations.array);
});
