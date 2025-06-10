import { dynamoClient } from "../dynamoClient.js";

const REVIEW_TABLE = "ReviewTable";


export const getReview = async (req, res) => {
  const id = req.params.id;

  const params = {
    TableName: REVIEW_TABLE,
    Key: { id }
  };

  try {
    const review = await dynamoClient.get(params).promise();
    res.json(review.Item); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Error in existing-review GET request" });
  }
};

export const addReview = async (req, res) => {
  const review = req.body.review;

  const params = {
    TableName: REVIEW_TABLE,
    Item: { ...review }
  };

  console.log("in reviewController.js addReview()");
  console.log({ ...review });

  try {
    await dynamoClient.put(params).promise(); 
    res.json({ message: "Review added successfully", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in new-review POST request" });
  }
};

export const updateReview = async (req, res) => {
  const review = req.body;
  const { id } = req.params;
  review.id = id;

  const params = {
    TableName: REVIEW_TABLE,
    Item: review
  };

  try {
    await dynamoClient.put(params).promise(); // overwrite existing item
    res.json({ message: "Review updated", review });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Review update error" });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: REVIEW_TABLE,
    Key: { id } 
  };

  try {
    await dynamoClient.delete(params).promise();
    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Failed to delete review" });
  }
};

export async function batchGetReviews(reviewIDs, docClient) {
  const getParams = {
    RequestItems: {
      [REVIEW_TABLE]: {
        Keys: reviewIDs
      }
    }
  };

  try {
    const data = await docClient.batchGet(getParams).promise();
    return data.Responses[REVIEW_TABLE];
  } catch (error) {
    console.error("batchGetReviews error:", error);
    return [];
  }
}
