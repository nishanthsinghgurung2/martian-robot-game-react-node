/* 
    NOTE: These methods are also present in the server directory.
    Added it separately in both client and server directory so that
    they are decoupled and later can be scaled independently if needed.
*/

export const isUpperCoordsInvalid = (upperCoords) => {
    let invalidUpperCoords = true;
    let boundaryCoords;
    if(upperCoords && typeof upperCoords === 'string') {
        boundaryCoords = upperCoords.split(' ');
        if(
            boundaryCoords.length === 2 &&
            (Number(boundaryCoords[0]) >= 0 && Number(boundaryCoords[0]) <= 50) &&
            (Number(boundaryCoords[1]) >= 0 && Number(boundaryCoords[1]) <= 50)
        ) {
            invalidUpperCoords = false;
        }
    }
    return invalidUpperCoords;
};

export const isRobotPositionInvalid = (robotPosition) => {
    if(robotPosition && typeof robotPosition === 'string') {
        const robotPositionArr = robotPosition.split(' ');
        if(robotPositionArr.length == 3 && 
            (Number(robotPositionArr[0])>=0 && Number(robotPositionArr[0])<=50) &&
            (Number(robotPositionArr[1])>=0 && Number(robotPositionArr[1])<=50) &&
            (robotPositionArr[2] === 'N' || robotPositionArr[2] === 'E'|| 
            robotPositionArr[2] === 'W' || robotPositionArr[2] === 'S')) {
                return false;
            }
    }
    return true;
};

export const isRobotInstructionInvalid = (robotInstruction) => {
    let invalidRobotInstruction = true;
    if(robotInstruction && typeof robotInstruction === 'string') {
        const robotInstructionArr = robotInstruction.split('');
        invalidRobotInstruction = robotInstructionArr.some(instruction => (instruction !== 'L' && instruction !== 'R' && instruction !== 'F'));
    }
    return invalidRobotInstruction;
};

export const isAnyRobotPositionInvalid = (robotPositionErrors, robotInstructionErrors) => {
    let anyPositionError = robotPositionErrors.some(robotPositionError => (robotPositionError === true))
    let anyInstructionError = robotInstructionErrors.some(robotInstructionError => (robotInstructionError === true))
    return anyPositionError || anyInstructionError;
};