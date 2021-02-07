let array = [];

// take an array
function crunchNumbers(obj) {
  let answer = 0;
  let numberOne = Number(obj.numOne);
  let numberTwo = Number(obj.numTwo);
  if (obj.operator === 'addBtn') {
    // console.log('Addition');
    answer = numberOne + numberTwo;
    return answer;
  } else if (obj.operator === 'subtractBtn') {
    // console.log('Subtraction');
    answer = numberOne - numberTwo;
    return answer;
  } else if (obj.operator === 'divideBtn') {
    // console.log('Division');
    answer = numberOne / numberTwo;
    return answer;
  } else if (obj.operator === 'multiplyBtn') {
    // console.log('Multiplication');
    answer = numberOne * numberTwo;
    return answer;
  }
}

module.exports = { array, crunchNumbers };
