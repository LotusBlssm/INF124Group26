import express from "express"
const app = express();
const {getReview, getReviewById, addOrUpdateReview, deleteReview, getUser, getUserById, addOrUpdateUser, deleteUser
} = require('./dynamoDB'); 
const port = 3000;

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
        res.jsaon(review); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'error: failed to get review'});
    }
    
});

// add new review
app.post('/api/revies/:id', async (req, res) =>{
    //TODO: add  new review 
    const review = req.body; 
    try {
        const newReview = await addOrUpdateReview(review);
        res.jsaon(newReview); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'review error'});
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

app.get('/api/game/:id', (req, res) => {
	//TODO: fetch the game info from igdb AND fetch our reviews for the game

});

app.listen(port, ()=>{
	console.log(`Server is running on port ${port}.`);
});

