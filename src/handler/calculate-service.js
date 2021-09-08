const { formatResult, applyOp, hasPrecedence } = require("./calculate-utils");

/* 
  Service layer to evaluate the expressions
  @input  lexically and syntactically correct expression
  @output evaluated result of the expression
*/
const evaluateExpression = (expression) => {
  let tokens = expression.split(" ");
  // Stack for numbers: 'values'
  let values = [];

  // Stack for Operators: 'ops'
  let ops = [];

  for (let i = 0; i < tokens.length; i++) {
    // Current token is a whitespace, skip it
    if (tokens[i] == " ") {
      continue;
    }

    if (tokens[i] >= "0" && tokens[i] <= "9") {
      // Current token is a number, push it to stack for numbers
      let sbuf = "";

      //there may be more than one digits in number
      while (i < tokens.length && tokens[i] >= "0" && tokens[i] <= "9") {
        sbuf = sbuf + tokens[i++];
      }
      values.push(parseFloat(sbuf));
      i--;
    } else if (tokens[i] == "(") {
      // Current token is an opening brace, push it to 'ops'
      ops.push(tokens[i]);
    } else if (tokens[i] == ")") {
      // Closing brace encountered, solve entire brace
      while (ops[ops.length - 1] != "(") {
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
      }
      ops.pop();
    } else if (
      // Current token is an operator.
      tokens[i] == "+" ||
      tokens[i] == "-" ||
      tokens[i] == "*" ||
      tokens[i] == "/" ||
      tokens[i] == "%"
    ) {
      while (ops.length > 0 && hasPrecedence(tokens[i], ops[ops.length - 1])) {
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
      }

      // Push current token to 'ops'.
      ops.push(tokens[i]);
    }
  }

  //entire expression has been parsed at this point, apply remaining ops to remaining values
  while (ops.length > 0) {
    values.push(applyOp(ops.pop(), values.pop(), values.pop()));
  }

  // top of 'values' contains result
  return parseFloat(formatResult(values.pop()));
};

module.exports = evaluateExpression;
