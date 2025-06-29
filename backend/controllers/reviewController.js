import { dynamoClient } from "../dynamoClient.js";

// GET REVIEWS DB
const REVIEW_TABLE = "ReviewTable";

export const getReview = async (req, res) => {
	//TODO: fetch the review from our database (id is the id of REVIEW we want)
    const id = req.params.id; 
    const params = {
        TableName: REVIEW_TABLE,
        Key: {
            id
        }
    };
    try {
        const review = await dynamoClient.get(params).promise();
        res.json(review); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'error in existing-review GET request'});
    }
    
};

// add new review
export const addReview = async (req, res) => {
    //TODO: add new review
    const review = req.body.review;
    const params = {
        TableName: REVIEW_TABLE, 
        Item: { ...review },
    };
    console.log('in reviewController.js addReview()');
    console.log({ ...review});
    try {
        const newReview = await dynamoClient.put(params).promise(); 
        res.json(newReview); 
    } catch (error) {
        console.error(error); 
        res.status(500).json({err: 'error in new-review POST request'});
    }
};

export const updateReview = async (req, res) => {
	//TODO: update the review in our database
    const review = req.body; 
    const {id} = req.params; 
    review.id = id;
    const params = {
        TableName: REVIEW_TABLE, 
        Item: review,
    };
    try {
        const updatedReview = await dynamoClient.put(params).promise(); 
        res.json(updatedReview); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'review update error'});
    }
};

// delete Review
export const deleteReview = async (req, res) => {
    //TODO: delete the game review
    const {id} = req.params; 
    const params = {
        TableName: REVIEW_TABLE,
        Item: review
    };
    try {
        res.json(await dynamoClient.delete(params).promise()); 
    } catch (err) {
        console.error(err); 
        res.status(500).json({err: "failed to delete review"});
    }
};

export async function batchGetReviews(reviewIDs, docClient) {
    // Helper function that will search for an array of reviews
    const getParams = {
        RequestItems: {
            ['ReviewTable']: {
                Keys: reviewIDs
            }
        }
    }
    return (await docClient.batchGet(getParams, function(err, data) { 
        if (err) console.log('batch req code 500 - ', err); 
        // else console.log('int200 - ', data); 
    }).promise())['Responses']['ReviewTable'];
}