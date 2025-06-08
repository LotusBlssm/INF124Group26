const {getReview, getReviewById, addOrUpdateReview, deleteReview} = require("../dynamoClient.js"); 

// GET REIVEWS DB

export const getReview = async (req, res) => {
	//TODO: fetch the reviews from our database (id is the id of the game whose reviews we want)
    const id = req.params.id; 
    try {
        const review = await getReviewById(id); 
        res.json(review); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'error in existing-review GET request'});
    }
    
};

// add new review
export const addReview = async (req, res) =>{
    //TODO: add new review 
    const review = req.body; 
    try {
        const newReview = await addOrUpdateReview(review);
        res.json(newReview); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'error in new-review POST request'});
    }
};

export const updateReview = async (req, res) => {
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
};

// delete Review
export const deleteReview = async (req, res) =>{
    //TODO: delete the game review
    const {id} = req.params; 
    try {
        res.json(await deleteReview(id)); 
    } catch (err) {
        console.error(err); 
        res.status(500).json({err: "failed to delete"});
    }
};