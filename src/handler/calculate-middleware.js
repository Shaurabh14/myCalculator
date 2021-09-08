const {
  isOperand,
  getThePrecedence,
  checkParenthesis,
} = require("./calculate-utils");

/*
  Calculator middle ware to validate whether the expression from body is valid or not.
  If not valid we will not hit the DB layer and return from here.
  @input expression from body of the request
  @output isValid
*/

const validateExpression = (s) => {
  //lexical analysis for incoming expression
  let isValidExpression = true;
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    if (
      isOperand(c) === false &&
      getThePrecedence(c) === 0 &&
      c != "(" &&
      c != ")" &&
      c != "." &&
      c != " "
    )
      isValidExpression = false;
  }

  //syntax analysis of incoming expression
  if (isValidExpression) {
    isValidExpression = checkParenthesis(s);
  }

  return isValidExpression;
};

module.exports = validateExpression;
