import { useState } from "react";
import { isRobotInstructionInvalid, isRobotPositionInvalid, isUpperCoordsInvalid } from "./utils/utility";

// custom hook to separate state logic from main app
const useRobotFinalPositionCalculate = () => {
    const blankRobotPosition = { robotPosition: "", robotInstruction: ""}
    const [upperCoordinates, setUpperCoordinates] = useState("");
    const [upperCoordinatesError, setUpperCoordinatesError] = useState(false);
    const [robotPositions, setRobotPositions] = useState([{}]);
    const [robotPositionErrors, setRobotPositionError] = useState([]);
    const [robotInstructionErrors, setRobotInstructionError] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [finalRobotCoordinates, setFinalRobotCoordinates] = useState([]);
    
    // Updates the upper coordinates input element
    const updateUpperCoordinates = (e) => {
        if(isUpperCoordsInvalid(e.target.value)) {
            setUpperCoordinatesError(true);
        } else {
            setUpperCoordinates(e.target.value);
            setUpperCoordinatesError(false);
        }
    };

    // Add input text elements for new robot position and instruction
    const addRobotsPositions = (e) => {
        e.preventDefault();
        setRobotPositions([...robotPositions, {...blankRobotPosition}]);
    }

    // Updates robot position
    const updateRobotPosition = (e) => {
        const updatedRobotPositions = [...robotPositions];
        updatedRobotPositions[e.target.dataset.idx][e.target.className] = e.target.value;
        setRobotPositions(updatedRobotPositions);
    }

    // Handles update in robot position and instruction
    const handlePositionChange = (e) => {
        if(e.target.className === "robotPosition"){
            const updatedRobotPositionError = [...robotPositionErrors];

            if(isRobotPositionInvalid(e.target.value)) {
                updatedRobotPositionError[e.target.dataset.idx] = true;
            } else {
                updatedRobotPositionError[e.target.dataset.idx] = false;
                updateRobotPosition(e);
            }
            setRobotPositionError(updatedRobotPositionError);

        } else if(e.target.className === "robotInstruction"){
            const updatedRobotInstructionError = [...robotInstructionErrors];
            if(isRobotInstructionInvalid(e.target.value)) {
                updatedRobotInstructionError[e.target.dataset.idx] = true;
            } else {
                updatedRobotInstructionError[e.target.dataset.idx] = false;
                updateRobotPosition(e);
            }
            setRobotInstructionError(updatedRobotInstructionError);
        }
    };

    // Fetches the final robots coords from the api request
    const calculateFinalRobotPositions = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setFinalRobotCoordinates([]);
        try {
            const response = await fetch("http://localhost:3001/get-final-robots-coords",{
                method: "POST",
                mode: "cors",
                referrerPolicy: "no-referrer",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                upperCoordinates: upperCoordinates,
                robotsPositions: robotPositions
                })
            });

            const result = await response.json();
            
            if(response.ok) {
                setError("");
                setFinalRobotCoordinates(result && result.data);
            } else {
                throw new Error(result && result.error && result.error.message);
            }
        } catch(err) {
            console.log("Error occured while fetching data!!!",err);
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