let array = [];

// take an array
function crunchNumbers(x) {
  let answer = 0;
  let numberOne = Number(x.numOne);
  let numberTwo = Number(x.numTwo);
  if (x.operator === 'addBtn') {
    console.log('Addition');
    answer = numberOne + numberTwo;
    return answer;
  } else if (x.operator === 'subtractBtn') {
    console.log('Subtraction');
    answer = numberOne - numberTwo;
    return answer;
  } else if (x.operator === 'divideBtn') {
    console.log('Division');
    answer = numberOne / numberTwo;
    return answer;
  } else if (x.operator === 'multiplyBtn') {
    console.log('Multiplication');
    answer = numberOne * numberTwo;
    return answer;
  }
}

module.exports = { array, crunchNumbers };
