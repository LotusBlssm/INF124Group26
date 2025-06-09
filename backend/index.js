import express from "express"
import { router as gameRouter } from "./routes/gameRoutes.js";
import { router as searchRouter } from "./routes/searchRoutes.js"
import { router as userRouter } from "./routes/userRoutes.js"
import { router as reviewRouter } from "./routes/reviewRoutes.js"
import { router as feedbackRouter } from "./routes/feedbackRoutes.js"
import { router as loginRouter } from "./routes/loginRoutes.js"

import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({
	origin: 'http://localhost:4200'
}));

app.use(express.json());

app.use('/api/user',  userRouter);

app.use('/api/review', reviewRouter);

app.use('/api/game', gameRouter);

app.use('/api/search', searchRouter);

app.use('/api/feedback', feedbackRouter);

app.use('/api/login', loginRouter);


app.listen(port, ()=>{
	console.log(`Server is running on port ${port}.`);
});

