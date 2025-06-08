import express from "express"
import { router as gameRouter } from "./routes/gameRoutes.js";
import { router as searchRouter } from "./routes/searchRoutes.js"
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({
	origin: 'http://localhost:4200'
}));

app.get('/api/user/:id', (req, res) => {
    //TODO: fetch our database and send the user data 

});

app.post('/api/user/:id', (req, res) => {
	//TODO: add the new user in our database

})

app.put('/api/user/:id', (req, res) => {
	//TODO: update the user in our database

})

app.get('/api/reviews/:id', (req, res) => {
	//TODO: fetch the reviews from our database (id is the id of the game whose reviews we want)

});

app.put('/api/reviews/:id', (req, res) => {
	//TODO: update the review in our database

});

app.use('/api/game', gameRouter);

app.use('/api/search', searchRouter);

// User Accounts 
app.get('/user/:id', async (req, res) => {
  const userID = req.params.id; // user must have their unique ID
  
  try {
    const data = await dynamodb.send(new GetCommand({
      TableName : 'Users', 
      Key  : { id: userID }
    }));

    if (data.Item) {
      res.json(data.Item); 
    }
    else {
      res.status(404).send('User Not Found'); 
    }
  } catch (err) {
    console.error(err); 
    res.status(500).send("Error Fetching User"); 

  }});

  
app.get('/review/:id', async (req, res) => {
	const reviewID = req.params.id; 

	try {
		const data = await dynamodb.send(new GetCommand({
			TableName : 'GameReviews',
			Key : {id: reviewID}
		}));
		if (data.Item) {
			res.json(data.Item); 
		}
		else {
			res.status(404).send('Review Not Found'); 
		}
	} catch (err) {
		console.error(err); 
		res.status(500).send("Error Fetching User"); 
	}
  });

app.listen(port, ()=>{
	console.log(`Server is running on port ${port}.`);
});
