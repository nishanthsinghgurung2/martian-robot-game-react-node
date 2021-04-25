'use strict';

var robotLostCoords = [];
var robotsFinalCoords = [];
var getRobotNewDirection = function getRobotNewDirection(currentDirection, currentInstruction) {
    if (currentDirection === 'N') {
        if (currentInstruction === 'L') {
            return 'W';
        } else if (currentInstruction === 'R') {
            return 'E';
        }
    } else if (currentDirection === 'E') {
        if (currentInstruction === 'L') {
            return 'N';
        } else if (currentInstruction === 'R') {
            return 'S';
        }
    } else if (currentDirection === 'S') {
        if (currentInstruction === 'L') {
            return 'E';
        } else if (currentInstruction === 'R') {
            return 'W';
        }
    } else if (currentDirection === 'W') {
        if (currentInstruction === 'L') {
            return 'S';
        } else if (currentInstruction === 'R') {
            return 'N';
        }
    }
    return currentDirection;
};

var moveRobotAndGetNewCords = function moveRobotAndGetNewCords(robotCurrentCoords, boundaryCoords) {
    if (robotLostCoords.includes(robotCurrentCoords)) {
        console.log('Lost coordinates. Do not move');
    } else {
        if (robotCurrentCoords[2] === 'N') {
            // falls from edge
            if (Number(robotCurrentCoords[1]) + 1 > boundaryCoords[1]) {
                robotLostCoords.push(robotCurrentCoords);
                var robotCoords = robotCurrentCoords.split('').join(' ');
                robotCoords = robotCoords + ' LOST';
                robotsFinalCoords.push(robotCoords);
                robotCurrentCoords = robotCoords;
            } else {
                var newYCoord = Number(robotCurrentCoords[1]) + 1;
                robotCurrentCoords = robotCurrentCoords.substr(0, 1) + newYCoord + robotCurrentCoords.substr(1 + newYCoord.toString().length);
            }
        } else if (robotCurrentCoords[2] === 'E') {
            // falls from edge
            if (Number(robotCurrentCoords[0]) + 1 > Number(boundaryCoords[0])) {
                robotLostCoords.push(robotCurrentCoords);
                var _robotCoords = robotCurrentCoords.split('').join(' ');
                _robotCoords = _robotCoords + ' LOST';
                robotsFinalCoords.push(_robotCoords);
                robotCurrentCoords = _robotCoords;
            } else {
                var newXCoord = Number(robotCurrentCoords[0]) + 1;
                robotCurrentCoords = robotCurrentCoords.substr(0, 0) + newXCoord + robotCurrentCoords.substr(0 + newXCoord.toString().length);
            }
        } else if (robotCurrentCoords[2] === 'S') {
            // falls from edge
            if (Number(robotCurrentCoords[1]) - 1 < 0) {
                robotLostCoords.push(robotCurrentCoords);
                var _robotCoords2 = robotCurrentCoords.split('').join(' ');
                _robotCoords2 = _robotCoords2 + ' LOST';
                robotsFinalCoords.push(_robotCoords2);
                robotCurrentCoords = _robotCoords2;
            } else {
                var _newYCoord = Number(robotCurrentCoords[1]) - 1;
                robotCurrentCoords = robotCurrentCoords.substr(0, 1) + _newYCoord + robotCurrentCoords.substr(1 + _newYCoord.toString().length);
            }
        } else if (robotCurrentCoords[2] === 'W') {
            // falls from edge
            if (Number(robotCurrentCoords[0]) - 1 < 0) {
                robotLostCoords.push(robotCurrentCoords);
                var _robotCoords3 = robotCurrentCoords.split('').join(' ');
                _robotCoords3 = _robotCoords3 + ' LOST';
                robotsFinalCoords.push(_robotCoords3);
                robotCurrentCoords = _robotCoords3;
            } else {
                var _newXCoord = Number(robotCurrentCoords[0]) - 1;
                robotCurrentCoords = robotCurrentCoords.substr(0, 0) + _newXCoord + robotCurrentCoords.substr(0 + _newXCoord.toString().length);
            }
        }
    }
    return robotCurrentCoords;
};

var getFinalRobotPositions = function getFinalRobotPositions(robotsMovementsInput) {
    var boundaryCoords = robotsMovementsInput.upperCoordinates.split(' ').join('');
    var robotsNewPositions = [];

    robotsMovementsInput.robotsPositions && robotsMovementsInput.robotsPositions.forEach(function (robot) {
        var robotCurrentCoords = robot.robotPosition.split(' ').join('');
        var robotCurrendDirection = robotCurrentCoords[2];
        // robotCurrentCoords.splice(2, 1);
        var robotInstruciton = robot.robotInstruction;
        var newDirection = robotCurrendDirection;
        var newCoords = null;
        var robotFall = false;
        for (var i = 0; i < robotInstruciton.length; i++) {
            if (robotInstruciton[i] === 'L' || robotInstruciton[i] === 'R') {
                newDirection = getRobotNewDirection(robotCurrentCoords[2], robotInstruciton[i]);
                robotCurrentCoords = robotCurrentCoords.substr(0, 2) + newDirection + robotCurrentCoords.substr(2 + newDirection.length);
            } else if (robotInstruciton[i] === 'F') {
                newCoords = moveRobotAndGetNewCords(robotCurrentCoords, boundaryCoords);
                if (newCoords.indexOf('LOST') > -1) {
                    robotFall = true;
                    break;
                } else {
                    robotCurrentCoords = newCoords;
                }
            }
        }
        if (!robotFall) {
            robotsFinalCoords.push(robotCurrentCoords);
        }
    });
    return robotsFinalCoords;
};

var robotsMovementsInput = {
    'upperCoordinates': '5 3',
    'numOfRobots': 3,
    'robotsPositions': [{
        'robotPosition': '1 1 E',
        'robotInstruction': 'RFRFRFRF'
    }, {
        'robotPosition': '3 2 N',
        'robotInstruction': 'FRRFLLFFRRFLL'
    }, {
        'robotPosition': '0 3 W',
        'robotInstruction': 'LLFFFLFLFL'
    }]
};

console.log('final robot positions....', getFinalRobotPositions(robotsMovementsInput));