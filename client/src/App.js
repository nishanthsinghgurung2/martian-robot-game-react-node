import React from 'react';
import './App.css';
import useRobotFinalPositionCalculate from './useRobotFinalPositionCalculate';
import { isAnyRobotPositionInvalid } from './utils/utility';

const App = () => {
  const {
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
  } = useRobotFinalPositionCalculate();

  return (
    <div className="App">
      <header>
        <h1>Martian Robots Game</h1>
      </header>
      <form className="robots-position-form">
        <label className="robots-position-form-item" htmlFor="text-upper-coords">
          Enter upper coordinates:
          <input
            data-testid="text-upper-coords"
            name="text-upper-coords"
            type="text"
            onBlur={updateUpperCoordinates} />
          { upperCoordinatesError? <div data-testid="upper-coords-invalid-error" className="error">Invalid upper coordinates</div>: null}
        </label>
        
        {robotPositions.length > 0? robotPositions.map((elem, index) => {
            const robotPositionId = `robot-${index}`;
            const robotInstructionId = `instruction-${index}`;
            return (
              <div key={robotPositionId} className="robot-position-instruction">
                <label className="robots-position-form-item" htmlFor={robotPositionId}>
                  Enter robot{index+ 1} position:
                  <input 
                    name={robotPositionId}
                    id={robotPositionId}
                    data-testid={robotPositionId}
                    data-idx={index}
                    className="robotPosition"
                    value={robotPositions[index].position}
                    onBlur={handlePositionChange}
                    type="text" />
                    { robotPositionErrors[index]? <div data-testid={`${robotPositionId}-error`} className="error">Invalid robot position</div>: null}
                </label>
                <label className="robots-position-form-item" htmlFor={robotInstructionId}>
                  Enter robot{index + 1} instruction:
                  <input 
                    name={robotInstructionId}
                    id={robotInstructionId}
                    data-testid={robotInstructionId}
                    data-idx={index}
                    className="robotInstruction"
                    value={robotPositions[index].instruction}
                    onBlur={handlePositionChange}
                    type="text" />
                    { robotInstructionErrors[index]? <div data-testid={`${robotInstructionId}-error`} className="error">Invalid robot instruction</div>: null}
                </label>
              </div>
            );
          }
        ): null}
        <label className="robots-position-form-item" htmlFor="robot-instruction">
          Add robots positions and instructions by clicking here:
          <button data-testid="add-robots" onClick={addRobotsPositions}>Add robots</button>
        </label>
        <button 
          data-testid="get-final-robot-positions"
          className="robots-position-form-item final-robot-positions"
          disabled={upperCoordinatesError || isAnyRobotPositionInvalid(robotPositionErrors, robotInstructionErrors)}
          onClick={calculateFinalRobotPositions}>
            Get Final Robot Positions
        </button>
      </form>
      <footer>
        <h3 className="footer-header">Final robot coordinates:</h3>
        {loading? <div>Loading....</div>: null}
        {error ? <div data-testid="server-error" className='error'>{error}</div> : null}
        
        {finalRobotCoordinates.length > 0 ? (
          <>
            <div data-testid='final-robot-positions'>
              {finalRobotCoordinates.map((finalRobotCoordinate, index) => <div key={`final-robot-coord-${index}`} data-testid={`final-robot-coord-${index}`}>{finalRobotCoordinate}</div>)}
            </div>
          </>
        ): null}
        
      </footer>
    </div>
  );
}

export default App;
