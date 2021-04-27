import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeAll(() => jest.spyOn(window, 'fetch'))

afterEach(cleanup);

describe('App', () => {
  it('should render the elements of the form', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('text-upper-coords')).toBeDefined();
    expect(getByTestId('robot-0')).toBeDefined();
    expect(getByTestId('instruction-0')).toBeDefined();
    expect(getByTestId('add-robots')).toBeDefined();
    expect(getByTestId('get-final-robot-positions')).toBeDefined();
  })

  it('should get the final robot coordinates that does not fall when Get Final Robot Positions button is pressed', async() => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async() => ({"data":["2 3 S"]})
    });
    
    const { getByTestId } = render(<App />)
    
    const inputUpperCoords = getByTestId('text-upper-coords');
    fireEvent.blur(inputUpperCoords, { target: { value: '5 3'}});
    expect(inputUpperCoords.value).toBe('5 3');

    const robotPosition = getByTestId('robot-0');
    fireEvent.blur(robotPosition, { target: { value: '0 3 W'}});
    expect(robotPosition.value).toBe('0 3 W');

    const robotInstruction = getByTestId('instruction-0');
    fireEvent.blur(robotInstruction, { target: { value: 'LLFFFLFLFL'}});
    expect(robotInstruction.value).toBe('LLFFFLFLFL');

    const getFinalRobotPositionsBtn = getByTestId('get-final-robot-positions');
    getFinalRobotPositionsBtn.click();
    
    await waitFor(() => expect(getByTestId('final-robot-coord-0').textContent).toBe('2 3 S'))
    
  });
  
  it('should get the final robot coordinates that does fall when Get Final Robot Positions button is pressed', async() => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async() => ({"data":["3 3 N LOST"]})
    });
    
    const { getByTestId } = render(<App />)
    
    const inputUpperCoords = getByTestId('text-upper-coords');
    fireEvent.blur(inputUpperCoords, { target: { value: '5 3'}});
    expect(inputUpperCoords.value).toBe('5 3');

    const robotPosition = getByTestId('robot-0');
    fireEvent.blur(robotPosition, { target: { value: '3 2 N'}});
    expect(robotPosition.value).toBe('3 2 N');

    const robotInstruction = getByTestId('instruction-0');
    fireEvent.blur(robotInstruction, { target: { value: 'FRRFLLFFRRFLL'}});
    expect(robotInstruction.value).toBe('FRRFLLFFRRFLL');

    const getFinalRobotPositionsBtn = getByTestId('get-final-robot-positions');
    getFinalRobotPositionsBtn.click();
    
    await waitFor(() => expect(getByTestId('final-robot-coord-0').textContent).toBe('3 3 N LOST'))
    
  });

  it('should get the final robot coordinates for multiple robots when Get Final Robot Positions button is pressed', async() => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async() => ({"data":["1 1 E","3 3 N LOST","2 3 S"]})
    });
    
    const { getByTestId } = render(<App />)
    
    const inputUpperCoords = getByTestId('text-upper-coords');
    fireEvent.blur(inputUpperCoords, { target: { value: '5 3'}});
    expect(inputUpperCoords.value).toBe('5 3');

    let robotPosition = getByTestId('robot-0');
    fireEvent.blur(robotPosition, { target: { value: '1 1 E'}});
    expect(robotPosition.value).toBe('1 1 E');

    let robotInstruction = getByTestId('instruction-0');
    fireEvent.blur(robotInstruction, { target: { value: 'RFRFRFRF'}});
    expect(robotInstruction.value).toBe('RFRFRFRF');

    let addRobotsBtn = getByTestId('add-robots');
    addRobotsBtn.click();

    robotPosition = getByTestId('robot-1');
    fireEvent.blur(robotPosition, { target: { value: '3 2 N'}});
    expect(robotPosition.value).toBe('3 2 N');

    robotInstruction = getByTestId('instruction-1');
    fireEvent.blur(robotInstruction, { target: { value: 'FRRFLLFFRRFLL'}});
    expect(robotInstruction.value).toBe('FRRFLLFFRRFLL');

    addRobotsBtn.click();

    robotPosition = getByTestId('robot-2');
    fireEvent.blur(robotPosition, { target: { value: '0 3 W'}});
    expect(robotPosition.value).toBe('0 3 W');

    robotInstruction = getByTestId('instruction-2');
    fireEvent.blur(robotInstruction, { target: { value: 'LLFFFLFLFL'}});
    expect(robotInstruction.value).toBe('LLFFFLFLFL');

    const getFinalRobotPositionsBtn = getByTestId('get-final-robot-positions');
    getFinalRobotPositionsBtn.click();
    
    await waitFor(() => {
      expect(getByTestId('final-robot-coord-0').textContent).toBe('1 1 E')
      expect(getByTestId('final-robot-coord-1').textContent).toBe('3 3 N LOST')
      expect(getByTestId('final-robot-coord-2').textContent).toBe('2 3 S')
    });
  });

  it('should return error message from server when upper coords are invalid', async() => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: async() => ({"error":{"status": "500", "message": "Invalid upper coords"}})
    });
    
    const { getByTestId } = render(<App />)
    
    const inputUpperCoords = getByTestId('text-upper-coords');
    fireEvent.change(inputUpperCoords, { target: { value: '500 300'}});
    expect(inputUpperCoords.value).toBe('500 300');

    const robotPosition = getByTestId('robot-0');
    fireEvent.change(robotPosition, { target: { value: '0 3 W'}});
    expect(robotPosition.value).toBe('0 3 W');

    const robotInstruction = getByTestId('instruction-0');
    fireEvent.change(robotInstruction, { target: { value: 'LLFFFLFLFL'}});
    expect(robotInstruction.value).toBe('LLFFFLFLFL');

    const getFinalRobotPositionsBtn = getByTestId('get-final-robot-positions');
    getFinalRobotPositionsBtn.click();
    
    await waitFor(() => expect(getByTestId('server-error').textContent).toBe('Invalid upper coords'))
    
  })

  it('should return error message from server for any issues', async() => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: async() => ({"error":{"status": "500", "message": "Invalid input"}})
    });
    
    const { getByTestId } = render(<App />)
    
    const inputUpperCoords = getByTestId('text-upper-coords');
    fireEvent.change(inputUpperCoords, { target: { value: '500 300'}});
    expect(inputUpperCoords.value).toBe('500 300');

    const robotPosition = getByTestId('robot-0');
    fireEvent.change(robotPosition, { target: { value: '0 3 W'}});
    expect(robotPosition.value).toBe('0 3 W');

    const robotInstruction = getByTestId('instruction-0');
    fireEvent.change(robotInstruction, { target: { value: 'LLFFFLFLFL'}});
    expect(robotInstruction.value).toBe('LLFFFLFLFL');

    const getFinalRobotPositionsBtn = getByTestId('get-final-robot-positions');
    getFinalRobotPositionsBtn.click();
    
    await waitFor(() => expect(getByTestId('server-error').textContent).toBe('Invalid input'))
    
  })

  describe('Validation Errors', () => {
    it('should show validation error if invalid upper coordinates', () => {
      const { getByTestId } = render(<App />)
    
      const inputUpperCoords = getByTestId('text-upper-coords');
      fireEvent.blur(inputUpperCoords, { target: { value: '500 300'}});
      
      const invalidUpperCoordsError = getByTestId('upper-coords-invalid-error');
      expect(invalidUpperCoordsError.textContent).toBe('Invalid upper coordinates');

      const getFinalRobotsCoordsBtn = getByTestId('get-final-robot-positions');
      expect(getFinalRobotsCoordsBtn).toBeDisabled();
    })

    it('should show validation error if robot position is invalid', () => {
      const { getByTestId } = render(<App />)
    
      const robotPosition = getByTestId('robot-0');
      fireEvent.blur(robotPosition, { target: { value: '2 2 P'}});
      
      const invalidRobotPosition = getByTestId('robot-0-error');
      expect(invalidRobotPosition.textContent).toBe('Invalid robot position');

      const getFinalRobotsCoordsBtn = getByTestId('get-final-robot-positions');
      expect(getFinalRobotsCoordsBtn).toBeDisabled();
    })
    
    it('should show validation error if robot instruction is invalid', () => {
      const { getByTestId } = render(<App />)
    
      const robotInstruction = getByTestId('instruction-0');
      fireEvent.blur(robotInstruction, { target: { value:'RFRFPLR'}});
      
      const invalidRobotInstruction = getByTestId('instruction-0-error');
      expect(invalidRobotInstruction.textContent).toBe('Invalid robot instruction');

      const getFinalRobotsCoordsBtn = getByTestId('get-final-robot-positions');
      expect(getFinalRobotsCoordsBtn).toBeDisabled();
    })
  })
})