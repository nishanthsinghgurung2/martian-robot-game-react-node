import express from 'express';
import { result } from './getFinalRobotPositions';



const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ data: result});
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});