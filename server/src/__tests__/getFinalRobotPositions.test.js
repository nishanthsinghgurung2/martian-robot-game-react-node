import { assert } from 'chai';
import { getFinalRobotPositions } from '../getFinalRobotPositions';

describe('getFinalRobotPositions', () => {
  it('should get the final positions of the robot that doesnt fall', () => {
    const robotsMovementsInput = {
      upperCoordinates: '5 3',
      robotsPositions: [
        {
          robotPosition: '1 1 E',
          robotInstruction: 'RFRFRFRF',
        },
      ],
    };
    assert.deepEqual(getFinalRobotPositions(robotsMovementsInput), ['1 1 E']);
  });

  it('should get the final positions of the robot that falls', () => {
    const robotsMovementsInput2 = {
      upperCoordinates: '5 3',
      robotsPositions: [
        {
          robotPosition: '3 2 N',
          robotInstruction: 'FRRFLLFFRRFLL',
        },
      ],
    };
    assert.deepEqual(getFinalRobotPositions(robotsMovementsInput2), [
      '3 3 N LOST',
    ]);
  });

  it('should get the final positions of the robots that has a mix of ones that falls and the others that doesnt', () => {
    const robotsMovementsInput2 = {
      upperCoordinates: '5 3',
      robotsPositions: [
        {
          robotPosition: '1 1 E',
          robotInstruction: 'RFRFRFRF',
        },
        {
          robotPosition: '3 2 N',
          robotInstruction: 'FRRFLLFFRRFLL',
        },
        {
          robotPosition: '0 3 W',
          robotInstruction: 'LLFFFLFLFL',
        },
      ],
    };
    assert.deepEqual(getFinalRobotPositions(robotsMovementsInput2), [
      '1 1 E',
      '3 3 N LOST',
      '2 3 S',
    ]);
  });

  describe('Errors', () => {
    it('should error when input is invalid', () => {
      assert.throws(getFinalRobotPositions, Error, 'Invalid input');
    });
    it('should error when input is invalid', () => {
      const robotsMovementsInput = {
        upperCoordinates: '500 300', // boundary is [50, 50] based on problem description
        robotsPositions: [
          {
            robotPosition: '3 2 N',
            robotInstruction: 'FRRFLLFFRRFLL',
          },
        ],
      };
      const getFinalRobotPositionsError = () =>
        getFinalRobotPositions(robotsMovementsInput);
      assert.throws(
        getFinalRobotPositionsError,
        Error,
        'Invalid upper coordinates'
      );
    });
    it('should error when robots positions are invalid', () => {
      const robotsMovementsInput = {
        upperCoordinates: '5 3',
        robotsPositions: [
          {
            robotPosition: '3 200 P',
            robotInstruction: 'FRRFLLFFRRFLL',
          },
        ],
      };
      assert.deepEqual(getFinalRobotPositions(robotsMovementsInput), [
        'Invalid robot position',
      ]);
    });
    it('should error when robots instructions are invalid', () => {
      const robotsMovementsInput = {
        upperCoordinates: '5 3',
        robotsPositions: [
          {
            robotPosition: '3 2 N',
            robotInstruction: 'PFRRPPFLLFFRRFLL',
          },
        ],
      };
      assert.deepEqual(getFinalRobotPositions(robotsMovementsInput), [
        'Invalid robot instruction',
      ]);
    });
  });
});
