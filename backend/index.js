import express from "express"
import { router as gameRouter } from "./routes/gameRoutes.js";
import { router as searchRouter } from "./routes/searchRoutes.js"
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({
	origin: 'http://localhost:4200'
}));

app.use('/api/user',  userRouter);

app.use('/api/review', reviewRouter);

app.use('/api/game', gameRouter);

app.use('/api/search', searchRouter);


app.listen(port, ()=>{
	console.log(`Server is running on port ${port}.`);
});

