'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getFinalRobotPositions = void 0;

// Gets the new robot direction after moving by 90 degrees
var getRobotNewDirection = function getRobotNewDirection(
  currentDirection,
  currentInstruction
) {
  switch (currentDirection) {
    case 'N':
      return currentInstruction === 'L'
        ? 'W'
        : currentInstruction === 'R'
        ? 'E'
        : currentDirection;

    case 'E':
      return currentInstruction === 'L'
        ? 'N'
        : currentInstruction === 'R'
        ? 'S'
        : currentDirection;

    case 'S':
      return currentInstruction === 'L'
        ? 'E'
        : currentInstruction === 'R'
        ? 'W'
        : currentDirection;

    case 'W':
      return currentInstruction === 'L'
        ? 'S'
        : currentInstruction === 'R'
        ? 'N'
        : currentDirection;

    default:
      return currentDirection;
  }
}; // Checks if the robot is at the coordinates from where one of the previous robots were lost

var isLostCoords = function isLostCoords(lostCoords, currentCoords) {
  var currentCoords_as_string = JSON.stringify(currentCoords);
  var currentCoordsInLostCoords = lostCoords.some(function (lostCoord) {
    return JSON.stringify(lostCoord) === currentCoords_as_string;
  });
  return currentCoordsInLostCoords;
}; // Records the coordinates from where the robot is lost

var recordLostCoords = function recordLostCoords(
  robotCurrentCoords,
  robotLostCoords,
  robotsNewPositions
) {
  robotLostCoords.push(robotCurrentCoords.slice());
  robotCurrentCoords.push('LOST');
  robotsNewPositions.push(robotCurrentCoords.join(' '));
}; // Move the robots forward in the choosen direction and gets the new robot coordinates

var moveRobotAndGetNewCords = function moveRobotAndGetNewCords(
  robotCurrentCoords,
  boundaryCoords,
  robotLostCoords,
  robotsNewPositions
) {
  if (isLostCoords(robotLostCoords, robotCurrentCoords)) {
    console.log('Lost coordinates. Robot does not move');
  } else {
    switch (robotCurrentCoords[2]) {
      case 'N': {
        if (Number(robotCurrentCoords[1]) + 1 > Number(boundaryCoords[1])) {
          recordLostCoords(
            robotCurrentCoords,
            robotLostCoords,
            robotsNewPositions
          );
        } else {
          var newYCoord = Number(robotCurrentCoords[1]) + 1;
          robotCurrentCoords[1] = newYCoord.toString();
        }

        break;
      }

      case 'E': {
        if (Number(robotCurrentCoords[0]) + 1 > Number(boundaryCoords[0])) {
          recordLostCoords(
            robotCurrentCoords,
            robotLostCoords,
            robotsNewPositions
          );
        } else {
          var newXCoord = Number(robotCurrentCoords[0]) + 1;
          robotCurrentCoords[0] = newXCoord.toString();
        }

        break;
      }

      case 'S': {
        if (Number(robotCurrentCoords[1]) - 1 < 0) {
          recordLostCoords(
            robotCurrentCoords,
            robotLostCoords,
            robotsNewPositions
          );
        } else {
          var _newYCoord = Number(robotCurrentCoords[1]) - 1;

          robotCurrentCoords[1] = _newYCoord.toString();
        }

        break;
      }

      case 'W': {
        if (Number(robotCurrentCoords[0]) - 1 < 0) {
          recordLostCoords(
            robotCurrentCoords,
            robotLostCoords,
            robotsNewPositions
          );
        } else {
          var _newXCoord = Number(robotCurrentCoords[0]) - 1;

          robotCurrentCoords[0] = _newXCoord.toString();
        }

        break;
      }
    }
  }

  return robotCurrentCoords;
};

var isRobotPositionInvalid = function isRobotPositionInvalid(robotPosition) {
  if (robotPosition && typeof robotPosition === 'string') {
    var robotPositionArr = robotPosition.split(' ');

    if (
      robotPositionArr.length == 3 &&
      Number(robotPositionArr[0]) >= 0 &&
      Number(robotPositionArr[0]) <= 50 &&
      Number(robotPositionArr[1]) >= 0 &&
      Number(robotPositionArr[1]) <= 50 &&
      (robotPositionArr[2] === 'N' ||
        robotPositionArr[2] === 'E' ||
        robotPositionArr[2] === 'W' ||
        robotPositionArr[2] === 'S')
    ) {
      return false;
    }
  }

  return true;
};

var isRobotInstructionInvalid = function isRobotInstructionInvalid(
  robotInstruction
) {
  var invalidRobotInstruction = true;

  if (robotInstruction && typeof robotInstruction === 'string') {
    var robotInstructionArr = robotInstruction.split('');
    invalidRobotInstruction = robotInstructionArr.some(function (instruction) {
      return instruction !== 'L' && instruction !== 'R' && instruction !== 'F';
    });
  }

  return invalidRobotInstruction;
};

var isUpperCoordsInvalid = function isUpperCoordsInvalid(upperCoords) {
  var invalidUpperCoords = true;
  var boundaryCoords;

  if (upperCoords && typeof upperCoords === 'string') {
    boundaryCoords = upperCoords.split(' ');

    if (
      boundaryCoords.length === 2 &&
      Number(boundaryCoords[0]) >= 0 &&
      Number(boundaryCoords[0]) <= 50 &&
      Number(boundaryCoords[1]) >= 0 &&
      Number(boundaryCoords[1]) <= 50
    ) {
      invalidUpperCoords = false;
    }
  }

  return invalidUpperCoords;
}; // Gets the final positions of all the robots in the mars

var getFinalRobotPositions = function getFinalRobotPositions(
  robotsMovementsInput
) {
  var boundaryCoords;
  var robotsNewPositions = [];
  var robotLostCoords = [];
  var upperCoordinates = robotsMovementsInput.upperCoordinates,
    robotsPositions = robotsMovementsInput.robotsPositions;

  if (isUpperCoordsInvalid(upperCoordinates)) {
    throw new Error('Invalid upper coordinates');
  } else {
    boundaryCoords = robotsMovementsInput.upperCoordinates.split(' ');
  }

  if (!robotsPositions || !Array.isArray(robotsPositions)) {
    throw new Error('Invalid robots positions');
  } else {
    robotsMovementsInput.robotsPositions &&
      robotsMovementsInput.robotsPositions.forEach(function (robot) {
        if (!robot || isRobotPositionInvalid(robot.robotPosition)) {
          robotsNewPositions.push('Invalid robot position');
        } else if (isRobotInstructionInvalid(robot.robotInstruction)) {
          robotsNewPositions.push('Invalid robot instruction');
        } else {
          var robotCurrentCoords = robot.robotPosition.split(' ');
          var newDirection = robotCurrendDirection;
          var newCoords = null;
          var robotFall = false;
          var robotCurrendDirection = robotCurrentCoords[2];
          var robotInstruction = robot.robotInstruction;

          for (var i = 0; i < robotInstruction.length; i++) {
            if (robotInstruction[i] === 'L' || robotInstruction[i] === 'R') {
              // Gets the new direction of robot
              newDirection = getRobotNewDirection(
                robotCurrentCoords[2],
                robotInstruction[i]
              );
              robotCurrentCoords[2] = newDirection;
            } else if (robotInstruction[i] === 'F') {
              // Moves the robot in the given direction and get the updated coordinates
              newCoords = moveRobotAndGetNewCords(
                robotCurrentCoords,
                boundaryCoords,
                robotLostCoords,
                robotsNewPositions
              );

              if (newCoords.includes('LOST')) {
                robotFall = true;
                break;
              } else {
                robotCurrentCoords = newCoords;
              }
            }
          }

          if (!robotFall) {
            robotsNewPositions.push(robotCurrentCoords.join(' '));
          }
        }
      });
    return robotsNewPositions;
  }
};

exports.getFinalRobotPositions = getFinalRobotPositions;
