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

app.post('/inputs', (req, res) => {
  let calculation = req.body.calcToAdd;
  newCalc(calculation);
  console.log('calculations array', calculations.array);
  res.sendStatus(200); // means OK!
  console.log('testing crunchNumbers', calculations.crunchNumbers(calculation));
});

app.get('/inputs', (req, res) => {});
