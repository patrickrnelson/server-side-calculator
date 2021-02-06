$(document).ready(onReady);

function onReady() {
  console.log('jq');
  $(document).on('click', '#submitBtn', onSubmit);
  $(document).on('click', '#clearBtn', onClear);
  // listen for operator button click
  $(document).on('click', '.operatorBtn', onOperator);
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
    numOne: numOne,
    numTwo: numTwo,
    operator: operator,
  };
  console.log(valuesObj);
}

function onClear() {
  console.log('onClear');
}
