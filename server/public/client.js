$(document).ready(onReady);

function onReady() {
  console.log('jq');
  $(document).on('click', '#submitBtn', onSubmit);
  $(document).on('click', '#clearBtn', onClear);
  $(document).on('click', '#');
}

function onSubmit(evt) {
  evt = event.preventDefault();
  console.log('onSubmit');

  let numOne = $('#numOneInput');
  let numTwo = $('#numTwoInput');
  let valuesObj = {
    numOne: numOne,
    numTwo: numTwo,
  };
}

function onClear() {
  console.log('onClear');
}
