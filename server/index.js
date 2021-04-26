import express from 'express';
import { getFinalRobotPositions } from './getFinalRobotPositions';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/get-final-robots-coords", (req, res) => {
  res.json({ data: getFinalRobotPositions(req.body)});
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});