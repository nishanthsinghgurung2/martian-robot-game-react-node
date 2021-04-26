"use strict";

var _express = _interopRequireDefault(require("express"));

var _getFinalRobotPositions = require("./getFinalRobotPositions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 3001;
var app = (0, _express["default"])();
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.get("/get-final-robots-coords", function (req, res) {
  res.json({
    data: (0, _getFinalRobotPositions.getFinalRobotPositions)(req.body)
  });
});
app.use(function (req, res, next) {
  var error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error'
    }
  });
});
app.listen(PORT, function () {
  console.log("Server listening on ".concat(PORT));
});