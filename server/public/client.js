$(document).ready(onReady);

function onReady() {
  // listen for submit button click
  $(document).on('click', '#submitBtn', onSubmit);
  // listen for clear button click
  $(document).on('click', '#clearBtn', onClear);
  // listen for operator button click
  $(document).on('click', '.operatorBtn', onOperator);
  // get any calculations living in the server array right away
  getCalculations();
}

// global variable to indicate which operator has been clicked
let operator = '';

function onOperator() {
  let operatorClick = $(this).attr('id');
  return (operator = operatorClick);
}

function onSubmit(evt) {
  evt = event.preventDefault();
  // Tests
  // console.log('onSubmit');
  // console.log(operator);

  // grab the number inputs
  let numOne = $('#numOneInput').val();
  let numTwo = $('#numTwoInput').val();

  let valuesObj = {
    numOne: Number(numOne),
    numTwo: Number(numTwo),
    operator: operator,
  };
  console.log(valuesObj);

  // if any inputs are blank, don't run anything
  if (numOne !== '' && numTwo !== '' && operator !== '') {
    // empty error message if there is one
    $('#errorMessage').empty();
    // send the values object to the server
    function addNewCalculation() {
      // Important....
      $.ajax({
        method: 'POST',
        url: '/inputs',
        data: {
          calcToAdd: valuesObj,
        },
      })
        // ...ajax...
        .then(function (response) {
          console.log('successful POST', response);
        })
        // ...pieces.
        .catch(function (error) {
          console.log('wah wah', error);
        });
    }
    addNewCalculation();
    getCalculations();
  } else {
    $('#errorMessage').append(`<p>ERROR: Missing Input</p>`);
  }
}

// get the calculations array from server
function getCalculations() {
  $.ajax({
    type: 'GET',
    url: '/inputs',
  }).then(function (response) {
    console.log('Successful GET');
    // after we has them, append everything to DOM
    appendToDom(response);
  });
}

function appendToDom(incomingArray) {
  console.log(incomingArray);
  // empty the DOM
  $('#listOfResults').empty();
  $('#resultNumber').empty();
  // Find the answer of the most recent calculation
  let lastAnswer = incomingArray[0].answer;
  // append the answer to the DOM
  $('#resultNumber').append(`
      <h3>${lastAnswer}</h3>`);
  // loop through the array of calculations
  for (let item of incomingArray) {
    // Append all of the calculations to the DOM
    // if statements are needed to tell which operator to display
    if (item.operator === 'addBtn') {
      $('#listOfResults').append(`
        <li>
        ${item.numOne} + ${item.numTwo} = ${item.answer}
        </li>`);
    } else if (item.operator === 'subtractBtn') {
      $('#listOfResults').append(`
        <li>
        ${item.numOne} - ${item.numTwo} = ${item.answer}
        </li>`);
    } else if (item.operator === 'divideBtn') {
      $('#listOfResults').append(`
        <li>
        ${item.numOne} / ${item.numTwo} = ${item.answer}
        </li>`);
    } else if (item.operator === 'multiplyBtn') {
      $('#listOfResults').append(`
        <li>
        ${item.numOne} * ${item.numTwo} = ${item.answer}
        </li>`);
    }
  }
}

// when the clear button is clicked
// clear all inputs, including the operator
function onClear() {
  operator = '';
  $('#numOneInput').val('');
  $('#numTwoInput').val('');
}
