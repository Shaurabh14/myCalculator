const chai = require("chai");
var assert = require("assert");
const supertest = require("supertest");
const api = supertest("http://localhost:3000");

describe("Test evaluate expression", () => {
  it("should evaluate the empty expression", () => {
    api
      .get("/evaluate")
      .send({ expression: "" })
      .expect(400)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        assert.equal(
          res.body.error,
          "Wrong expression, Please check the payload"
        );
      });
  });
  it("should evaluate the expression with no operator", () => {
    api
      .get("/evaluate")
      .send({ expression: "100" })
      .expect(400)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        assert.equal(res.body.answer, 100);
      });
  });
  it("should evaluate the expression with combination", () => {
    api
      .get("/evaluate")
      .send({
        expression:
          "1122.1 + 9 * 7 * 130.999 - 1 / * 1.111 - 2.2231111111 + 120024 + 1 + 3 - 1",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        assert.equal(res.body.error, "Expression Evaluation Error");
      });
  });
  it("should return divide by zero error", () => {
    api
      .get("/evaluate")
      .send({
        expression: "1122.1 / 0",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        assert.equal(res.body.error, "Cannot divide by zero");
      });
  });
  it("should return mod by zero error", () => {
    api
      .get("/evaluate")
      .send({
        expression: "1122.1 % 0",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        assert.equal(res.body.error, "Cannot mod by zero");
      });
  });
});
