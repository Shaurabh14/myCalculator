const express = require("express");
const router = express.Router();
const validateExpression = require("./calculate-middleware");
const evaluateExpression = require("./calculate-service");

router.get("/", function (req, res, next) {
  const reqBody = {
    expression: req.body?.expression,
  };

  try {
    if (reqBody.expression) {
      //validate expression middleware layer
      const isLexAndSyntaxValid = validateExpression(reqBody.expression);
      if (isLexAndSyntaxValid) {
        //evaluate expression service layer
        const result = evaluateExpression(reqBody.expression);
        if (result === 0)
          return res.status(200).send({
            answer: result,
          });
        if (result) {
          res.status(200).send({
            answer: result,
          });
        } else {
          res.status(400).send({
            error: "Expression Evaluation Error",
          });
        }
      } else {
        res.status(400).send({
          error: "Lexical or Syntax error in the expression",
        });
      }
    } else {
      res.status(400).send({
        error: "Wrong expression, Please check the payload",
      });
    }
  } catch (err) {
    res.status(400).send({
      error: err,
    });
  }
});

module.exports = router;
