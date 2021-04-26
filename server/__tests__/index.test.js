import supertest from 'supertest';
import { assert } from 'chai';
import app from '../index';

const robotsMovementsInput = {
    'upperCoordinates': '5 3',
    'robotsPositions': [
       {
           "robotPosition": "1 1 E",
           "robotInstruction": "RFRFRFRF"
       },
       {
           'robotPosition': '3 2 N',
           'robotInstruction': 'FRRFLLFFRRFLL'
       },
       {
           "robotPosition": "0 3 W",
           "robotInstruction": "LLFFFLFLFL"
       }
    ]
};

describe('index page test', () => {
    it('should return final robots positions', done => {
        supertest(app.listen())
            .post('/get-final-robots-coords')
            .send(robotsMovementsInput)
            .expect(200)
            .end((err, response) => {
                assert.deepEqual(response.body.data, [ '1 1 E', '3 3 N LOST', '2 3 S' ])
                done();
            });
            
    })

    it('should return 404 response for route not found', done => {
        supertest(app.listen())
            .post('/unknown-path')
            .send(robotsMovementsInput)
            .expect(404)
            .end((err, response) => {
                assert.deepEqual(response.body.error.status, 404);
                assert.deepEqual(response.body.error.message, 'Not found');
                done();
            });
    })

    it('should return 500 errors for invalid upper coordinates', done => {
        let invalidInput = {...robotsMovementsInput, upperCoordinates: '500 300'}
        supertest(app.listen())
            .post('/get-final-robots-coords')
            .send(invalidInput)
            .expect(500)
            .end((err, response) => {
                assert.deepEqual(response.body.error.status, 500);
                assert.deepEqual(response.body.error.message, 'Invalid upper coordinates');
                done();
            });
    })

    it('should return 500 errors for invalid robots position array', done => {
        let invalidInput = {...robotsMovementsInput, robotsPositions: 'invalid positions'}
        supertest(app.listen())
            .post('/get-final-robots-coords')
            .send(invalidInput)
            .expect(500)
            .end((err, response) => {
                assert.deepEqual(response.body.error.status, 500);
                assert.deepEqual(response.body.error.message, 'Invalid robots positions');
                done();
            });
    })

    it('should return final robots positions with invalid robot position message for invalid positions', done => {
        let invalidInput = {...robotsMovementsInput, robotsPositions: [
            {
                "robotPosition": "1 1 B", //invalid position
                "robotInstruction": "RFRFRFRF"
            },
            {
                'robotPosition': '3 2 N',
                'robotInstruction': 'FRRFLLFFRRFLL'
            },
            {
                "robotPosition": "0 3 W",
                "robotInstruction": "LLFFFLFLFL"
            }
         ]}
        supertest(app.listen())
            .post('/get-final-robots-coords')
            .send(invalidInput)
            .expect(200)
            .end((err, response) => {
                assert.deepEqual(response.body.data, [ 'Invalid robot position', '3 3 N LOST', '2 3 S' ])
                done();
            });
            
    })

    it('should return final robots positions with invalid robot instruction message for invalid instruction', done => {
        let invalidInstructionsInInput = {...robotsMovementsInput, robotsPositions: [
            {
                "robotPosition": "1 1 E", 
                "robotInstruction": "KRFRFRFRF" //invalid instruction
            },
            {
                'robotPosition': '3 2 N',
                'robotInstruction': 'FRRFLLFFRRFLL' 
            },
            {
                "robotPosition": "0 3 W",
                "robotInstruction": "LLFFFLFLFL"
            }
         ]};

        supertest(app.listen())
            .post('/get-final-robots-coords')
            .send(invalidInstructionsInInput)
            .expect(200)
            .end((err, response) => {
                assert.deepEqual(response.body.data, [ 'Invalid robot instruction', '3 3 N LOST', '2 3 S' ])
                done();
            });
            
    })
})