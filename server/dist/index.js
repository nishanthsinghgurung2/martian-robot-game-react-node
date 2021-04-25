'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _getFinalRobotPositions = require('./getFinalRobotPositions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 3001;

var app = (0, _express2.default)();

app.get("/api", function (req, res) {
    res.json({ data: _getFinalRobotPositions.result });
});

app.listen(PORT, function () {
    console.log('Server listening on ' + PORT);
});