import { dynamoClient } from "../dynamoClient.js";

const FEEDBACK_TABLE = "FeedbackTable";

export const getFeedback = async (req, res) => {
  const id = req.params.id;
  const params = {
    TableName: FEEDBACK_TABLE,
    Key: { id }
  };

  try {
    const feedback = await dynamoClient.get(params).promise();
    if (!feedback.Item) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json(feedback.Item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in existing-feedback GET request" });
  }
};

export const addFeedback = async (req, res) => {
  let feedback = req.body;
  const feedbackID = 'fb-' + Date.now();

  feedback.feedbackID = feedbackID;
  console.log("Putting item:", JSON.stringify(feedback));

  console.log('📥 Received feedback:', feedback); // Add this line!
  // Ensure primary key 'id' exists (map from 'feedbackID' if necessary)
  feedback.id = feedback.feedbackID || feedback.id;
  if (!feedback.id) {
    return res.status(400).json({ error: "'id' (or 'feedbackID') is required" });
  }

  // Optional: remove feedbackID if you don't want it stored separately
  delete feedback.feedbackID;

  const params = {
    TableName: FEEDBACK_TABLE,
    Item: feedback
  };

  try {
    await dynamoClient.put(params).promise();
    res.json({ message: "Feedback added successfully", feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in new-feedback POST request" });
  }
};
