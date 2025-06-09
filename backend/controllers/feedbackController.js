import { dynamoClient } from "../dynamoClient.js";

const FEEDBACK_TABLE = "FeedbackTable";

export const getFeedback = async (req, res) => {
    // get a piece of feedback from our database (specified by its ID)
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
        res.status(500).json({err: 'error in existing-feedback GET request'});
    }
    
};

export const addFeedback = async (req, res) => {
    // add new feedback
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
        res.status(500).json({err: 'error in new-feedback POST request'});
    }
};