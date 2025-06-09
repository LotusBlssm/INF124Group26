import { dynamoClient } from "../dynamoClient.js";
FEEDBACK_TABLE = "FeedbackTable";

export const getFeedback = async (req, res) => {
    //TODO: fetch the reviews from our database (id is the id of the game whose reviews we want)
    const id = req.params.id; 
    const params = {
        TableName: FEEDBACK_TABLE,
        Key: {
            id
        }
    };
    try {
        const feedback = await dynamoClient.get(params).promise();
        res.json(feedback); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'error in existing-review GET request'});
    }
    
};

// add new feedback
export const addFeedback= async (req, res) =>{
    //TODO: add new review 
    const feedback = req.body; 
    const params = {
        TableName: FEEDBACK_TABLE, 
        Item: feedback,
    };
    try {
        const newFeedback = await dynamoClient.put(params).promise(); 
        res.json(newFeedback); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'error in new-review POST request'});
    }
};