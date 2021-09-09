/*
    Utility to check balance of parenthesis in expression
*/
const checkParenthesis = (s) => {
  let stack = 0;
  for (let i = 0; i < s.length; ++i) {
    const c = s.charAt(i);
    if (c === "(") ++stack;
    else if (c === ")") {
      --stack;
      if (stack < 0) return false;
    }
  }
  return stack === 0;
};

/*
    Utility to check if character is an operand or not
*/
const isOperand = (c) => {
  return "0" <= c && c <= "9";
};

/*
    Utility to get the precedence accordingly
*/
const getThePrecedence = (precedence) => {
  if (precedence == "@" || precedence == "(" || precedence == ")") return 1;
  else if (precedence == "+" || precedence == "-") return 2;
  else if (precedence == "/" || precedence == "*" || precedence == "%")
    return 3;
  else if (precedence == "^") return 4;
  else return 0;
};

/*
    Utility function to format the result
*/
const formatResult = (number, decimal = 2) => {
  return number === 0
    ? 0
    : number && Number.parseFloat(number).toFixed(decimal);
};

/*
    Utility to check if the operator has precedence or not
*/
const hasPrecedence = (op1, op2) => {
  if (op2 == "(" || op2 == ")") {
    return false;
  }
  if ((op1 == "*" || op1 == "/" || op1 == "%") && (op2 == "+" || op2 == "-")) {
    return false;
  } else {
    return true;
  }
};

/*
    Utility to apply the operator and return the result
*/
const applyOperator = (op, b, a) => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b == 0) {
        throw "Cannot divide by zero";
      }
      return parseFloat(a / b);
    case "%":
      if (b == 0) {
        throw "Cannot mod by zero";
      }
      return parseFloat(a % b);
  }
  return 0;
};

module.exports = {
  checkParenthesis,
  isOperand,
  getThePrecedence,
  formatResult,
  hasPrecedence,
  applyOperator,
};
