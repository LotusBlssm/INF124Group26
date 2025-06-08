import express from "express"
import { router as gameRouter } from "./routes/gameRoutes.js";
import { router as searchRouter } from "./routes/searchRoutes.js"
import cors from "cors";

const app = express();
const {getReview, getReviewById, addOrUpdateReview, deleteReview, getUser, getUserById, addOrUpdateUser, deleteUser
} = require('./dynamoDB'); 
const port = 3000;

app.use(cors({
	origin: 'http://localhost:4200'
}));

app.get('/api/user/:id', async (req, res) => {
    //TODO: fetch our database and send the user data 
    const id = req.params.id; 
    try {
        const review = await getUserById(id); 
        res.jsaon(user); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'error: failed to get user'});
    }

});

app.post('/api/user', async (req, res) => {
    //TODO: add the new user in our database
    const review = req.body; 
    try {
        const newUser= await addOrUpdateReview(user);
        res.jsaon(newUser); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'error: failed to add new user'});
    }


})

app.put('/api/user/:id', async (req, res) => {
	//TODO: update the user in our database
    const user = req.body; 
    const {id} = req.params; 
    review.id = id;
    try {
        const updatedUser = await addOrUpdateReview(user);
        res.jsaon(updatedUser); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'review error'});
    }

})

app.get('/api/reviews/:id', async (req, res) => {
	//TODO: fetch the reviews from our database (id is the id of the game whose reviews we want)
    const id = req.params.id; 
    try {
        const review = await getReviewById(id); 
        res.json(review); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'error in existing-review GET request'});
    }
    
});

// add new review
app.post('/api/reviews/:id', async (req, res) =>{
    //TODO: add new review 
    const review = req.body; 
    try {
        const newReview = await addOrUpdateReview(review);
        res.json(newReview); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'error in new-review POST request'});
    }
})

app.put('/api/reviews/:id',  async (req, res) => {
	//TODO: update the review in our database
    const review = req.body; 
    const {id} = req.params; 
    review.id = id;
    try {
        const updatedReview = await addOrUpdateReview(review);
        res.jsaon(updatedReview); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'review error'});
    }
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

// delete Review
app.delete('/api/reviews/:id', async (req, res) =>{
    //TODO: delete the game review
    const {id} = req.params; 
    try {
        res.json(await deleteReview(id)); 
    } catch (err) {
        console.error(err); 
        res.status(500).json({err: "failed to delete"});
    }
})

app.listen(port, ()=>{
	console.log(`Server is running on port ${port}.`);
});

