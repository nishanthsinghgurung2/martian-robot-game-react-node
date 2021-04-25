import express from 'express';
import finalRobotCoords from './getFinalRobotPositions';



const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ data: finalRobotCoords});
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});