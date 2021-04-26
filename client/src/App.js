import React, { useState } from 'react';
import './App.css';

const App = () => {
  const blankRobotPosition = { robotPosition: '', robotInstruction: ''}
  const [upperCoordinates, setUpperCoordinates] = useState('');
  const [robotPositions, setRobotPositions] = useState([{}]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [finalRobotCoordinates, setFinalRobotCoordinates] = useState([]);

  const updateUpperCoordinates = (e) => {
    setUpperCoordinates(e.target.value);
  };

  const addRobotsPositions = (e) => {
    e.preventDefault();
    setRobotPositions([...robotPositions, {...blankRobotPosition}]);
  }

  const handlePositionChange = (e) => {
    const updatedRobotPositions = [...robotPositions];
    updatedRobotPositions[e.target.dataset.idx][e.target.className] = e.target.value;
    setRobotPositions(updatedRobotPositions);
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
  
  return (
    <div className="App">
      <header><h1>Martian Robots Game</h1></header>
      <form className="robots-position-form">
        <label className="robots-position-form-item" htmlFor="text-upper-coords">
          Enter upper coordinates:
          <input name="text-upper-coords" type="text" onBlur={updateUpperCoordinates} />
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
                    onChange={handlePositionChange}
                    type="text" />
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
                    onChange={handlePositionChange}
                    type="text" />
                </label>
              </div>
            );
          }
        ): null}
        <label className="robots-position-form-item" htmlFor="robot-instruction">
          Add robots positions and instructions by clicking here:
          <button onClick={addRobotsPositions}>Add robots</button>
        </label>
        <button className="robots-position-form-item final-robot-positions" onClick={calculateFinalRobotPositions}>Get Final Robot Positions</button>
      </form>
      <footer>
        <h3 className="footer-header">Final robot coordinates:</h3>
        {loading? <div>Loading....</div>: null}
        {error ? <div className='error'>{error}</div> : null}
        
        {finalRobotCoordinates.length > 0 ? (
          <>
            <div>
              {finalRobotCoordinates.map(finalRobotCoordinate => <div>{finalRobotCoordinate}</div>)}
            </div>
          </>
        ): null}
        
      </footer>
    </div>
  );
}

export default App;
