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
  $('#listOfResults').empty();
  $('#resultNumber').empty();
  for (let item of incomingArray) {
    $('#listOfResults').append(`
      <li>
      ${item.numOne} + ${item.numTwo} = ${item.answer}
      </li>`);
  }
  for (i = 0; i < incomingArray.length; i++) {
    let lastItem = incomingArray[incomingArray.length - 1];
    let lastAnswer = lastItem.Answer;
    $('#resultNumber').append(`
      <h3>${lastAnswer}</h3>`);
  }
}

function onClear() {
  operator = '';
  $('#numOneInput').val('');
  $('#numTwoInput').val('');
}
