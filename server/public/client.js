$(document).ready(onReady);

function onReady() {
  console.log('jq');
  $(document).on('click', '#submitBtn', onSubmit);
  $(document).on('click', '#clearBtn', onClear);
  // listen for operator button click
  $(document).on('click', '.operatorBtn', onOperator);
  getCalculations();
}

let operator = '';

function onOperator() {
  let operatorClick = $(this).attr('id');
  return (operator = operatorClick);
}

function onSubmit(evt) {
  evt = event.preventDefault();
  console.log('onSubmit');
  console.log(operator);

  let numOne = $('#numOneInput').val();
  let numTwo = $('#numTwoInput').val();

  let valuesObj = {
    numOne: Number(numOne),
    numTwo: Number(numTwo),
    operator: operator,
  };
  console.log(valuesObj);

  if (numOne !== '' && numTwo !== '' && operator !== '') {
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
  }
}

function getCalculations() {
  $.ajax({
    type: 'GET',
    url: '/inputs',
  }).then(function (response) {
    console.log('Successful GET');
    appendToDom(response);
  });
}

function appendToDom(incomingArray) {
  console.log(incomingArray);
  // empty the DOM
  $('#listOfResults').empty();
  $('#resultNumber').empty();
  // Find the answer of the most recent calculation
  let lastItem = incomingArray[incomingArray.length - 1];
  let lastAnswer = lastItem.answer;
  // append the answer to the DOM
  $('#resultNumber').append(`
      <h3>${lastAnswer}</h3>`);
  // loop through the array of calculations
  for (let item of incomingArray) {
    // Append all of the calculations to the DOM
    $('#listOfResults').append(`
      <li>
      ${item.numOne} + ${item.numTwo} = ${item.answer}
      </li>`);
  }
}

function onClear() {
  operator = '';
  $('#numOneInput').val('');
  $('#numTwoInput').val('');
}
