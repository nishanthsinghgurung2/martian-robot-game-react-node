import React, { useState } from 'react';
import { isRobotInstructionInvalid, isRobotPositionInvalid, isUpperCoordsInvalid } from './utils/utility';

const useRobotFinalPositionCalculate = () => {
    const blankRobotPosition = { robotPosition: '', robotInstruction: ''}
    const [upperCoordinates, setUpperCoordinates] = useState('');
    const [upperCoordinatesError, setUpperCoordinatesError] = useState(false);
    const [robotPositions, setRobotPositions] = useState([{}]);
    const [robotPositionErrors, setRobotPositionError] = useState([]);
    const [robotInstructionErrors, setRobotInstructionError] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [finalRobotCoordinates, setFinalRobotCoordinates] = useState([]);
    
    const updateUpperCoordinates = (e) => {
        if(isUpperCoordsInvalid(e.target.value)) {
            setUpperCoordinatesError(true);
        } else {
            setUpperCoordinates(e.target.value);
            setUpperCoordinatesError(false);
        }
    };

    const addRobotsPositions = (e) => {
        e.preventDefault();
        setRobotPositions([...robotPositions, {...blankRobotPosition}]);
    }

    const handlePositionChange = (e) => {
        if(e.target.className === 'robotPosition'){
            if(isRobotPositionInvalid(e.target.value)) {
                const updatedRobotPositionError = [...robotPositionErrors];
                updatedRobotPositionError[e.target.dataset.idx] = true;
                setRobotPositionError(updatedRobotPositionError);
            } else {
                const updatedRobotPositionError = [...robotPositionErrors];
                updatedRobotPositionError[e.target.dataset.idx] = false;
                setRobotPositionError(updatedRobotPositionError);

                const updatedRobotPositions = [...robotPositions];
                updatedRobotPositions[e.target.dataset.idx][e.target.className] = e.target.value;
                setRobotPositions(updatedRobotPositions);
            }
        } else if(e.target.className === 'robotInstruction'){
            const updatedRobotInstructionError = [...robotInstructionErrors];
            if(isRobotInstructionInvalid(e.target.value)) {
                updatedRobotInstructionError[e.target.dataset.idx] = true;
                setRobotInstructionError(updatedRobotInstructionError);
            } else {
                updatedRobotInstructionError[e.target.dataset.idx] = false;
                setRobotInstructionError(updatedRobotInstructionError);

                const updatedRobotPositions = [...robotPositions];
                updatedRobotPositions[e.target.dataset.idx][e.target.className] = e.target.value;
                setRobotPositions(updatedRobotPositions);
            }
        }
    };

    const calculateFinalRobotPositions = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setFinalRobotCoordinates([]);
        try {
        const response = await fetch('http://localhost:3001/get-final-robots-coords',{
            method: 'POST',
            mode: 'cors',
            referrerPolicy: 'no-referrer',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            upperCoordinates: upperCoordinates,
            robotsPositions: robotPositions
            })
        });

        const result = await response.json();
        if(response.ok) {
            setError('');
            setFinalRobotCoordinates(result && result.data);
        } else {
            throw new Error(result && result.error && result.error.message);
        }
        } catch(err) {
        console.log('Error occured while fetching data!!!',err);
        setError(err.message)
        setFinalRobotCoordinates([]);
        } finally {
        setLoading(false);
        }
    };
    return {
        robotPositions,
        error,
        loading,
        finalRobotCoordinates,
        upperCoordinatesError,
        robotPositionErrors,
        robotInstructionErrors,
        updateUpperCoordinates,
        addRobotsPositions,
        handlePositionChange,
        calculateFinalRobotPositions
    };
};

export default useRobotFinalPositionCalculate;