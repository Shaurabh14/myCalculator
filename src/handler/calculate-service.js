const {
  formatResult,
  applyOperator,
  hasPrecedence,
} = require("./calculate-utils");

/* 
  Service layer to evaluate the expressions
  @input  lexically and syntactically correct expression
  @output evaluated result of the expression
*/
const evaluateExpression = (expression) => {
  let tokens = expression.split(" ");
  // Stack for numbers: 'output'
  let output = [];

  // Stack for Operators: 'operators'
  let operators = [];

  for (let i = 0; i < tokens.length; i++) {
    // Current token is a whitespace, skip it
    if (tokens[i] == " ") {
      continue;
    }

    if (tokens[i] >= "0" && tokens[i] <= "9") {
      // Current token is a number, push it to stack for numbers
      let stringBuffer = "";

      //there may be more than one digits in number
      while (i < tokens.length && tokens[i] >= "0" && tokens[i] <= "9") {
        stringBuffer = stringBuffer + tokens[i++];
      }
      output.push(parseFloat(stringBuffer));
      i--;
    } else if (tokens[i] == "(") {
      // Current token is an opening brace, push it to 'operators'
      operators.push(tokens[i]);
    } else if (tokens[i] == ")") {
      // Closing brace encountered, solve entire brace
      while (operators[operators.length - 1] != "(") {
        output.push(applyOperator(operators.pop(), output.pop(), output.pop()));
      }
      operators.pop();
    } else if (
      // Current token is an operator.
      tokens[i] == "+" ||
      tokens[i] == "-" ||
      tokens[i] == "*" ||
      tokens[i] == "/" ||
      tokens[i] == "%"
    ) {
      while (
        operators.length > 0 &&
        hasPrecedence(tokens[i], operators[operators.length - 1])
      ) {
        output.push(applyOperator(operators.pop(), output.pop(), output.pop()));
      }

      // Push current token to 'operators'.
      operators.push(tokens[i]);
    }
  }

  //entire expression has been parsed at this point, apply remaining operators to remaining output
  while (operators.length > 0) {
    output.push(applyOperator(operators.pop(), output.pop(), output.pop()));
  }

  // top of 'output' contains result
  return parseFloat(formatResult(output.pop()));
};

module.exports = evaluateExpression;
