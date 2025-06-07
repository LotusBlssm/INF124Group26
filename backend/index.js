import express from "express"
const app = express();
const {getReview, getReviewById, addOrUpdateReview, deleteReview} = require('./dynamoClient'); 
const port = 3000;

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

app.get('/api/game/:id', (req, res) => {
	//TODO: fetch the game info from igdb AND fetch our reviews for the game

});

app.listen(port, ()=>{
	console.log(`Server is running on port ${port}.`);
});


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

  
// Reviews 
// get Review 
  app.get('/reviews', async (req, res) => {
    try {
        const review = await getReview(); 
        res.jsaon(review); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'review error'});
    }
})

// get Review by ID 
app.get('/reviews/:id', async (req, res) => {
    const id = req.params.id; 
    try {
        const review = await getReviewById(id); 
        res.jsaon(review); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'review error'});
    }
})


// add Review 
app.post('/reviews', async (req, res) => {
    const review = req.body; 
    try {
        const newReview = await addOrUpdateReview(review);
        res.jsaon(newReview); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'review error'});
    }
})

// update Review 
app.put('/reviews/:id', async (req, res) => {
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
})

// delete Review
app.delete('/reviews/:id', async (req, res) =>{
    const {id} = req.params; 
    try {
        res.json(await deleteReview(id)); 
    } catch (err) {
        console.error(err); 
        res.status(500).json({err: "failed to delete"});
    }
})