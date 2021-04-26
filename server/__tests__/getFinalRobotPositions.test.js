import { getFinalRobotPositions } from "../getFinalRobotPositions";



describe('getFinalRobotPositions', () => {
    test('should get the final positions of the robot that doesnt fall', () => {
        const robotsMovementsInput = {
            'upperCoordinates': '5 3',
            'numOfRobots': 3,
            'robotsPositions': [
                {
                    'robotPosition': '1 1 E',
                    'robotInstruction': 'RFRFRFRF'
                }
            ]
        };
        expect(getFinalRobotPositions(robotsMovementsInput)).toEqual(['1 1 E']);
    })

    test('should get the final positions of the robot that falls', () => {
       const robotsMovementsInput2 = {
            'upperCoordinates': '5 3',
            'numOfRobots': 3,
            'robotsPositions': [
                {
                    'robotPosition': '3 2 N',
                    'robotInstruction': 'FRRFLLFFRRFLL'
                }
            ]
        };
        expect(getFinalRobotPositions(robotsMovementsInput2)).toEqual(['3 3 N LOST']);
    })
})