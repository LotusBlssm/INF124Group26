// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
//import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

// DO NOT PUSH aws-sdk
const AWS = require('aws-sdk');
// Delete this key before pushing the work

require('dotenv').config();

AWS.config.update({ 

    region: 'us-east-2'

 });
const dynamoClient = new AWS.DynamoDB.DocumentClient(); 
const USER_TABLE = 'UserTable'; 
const REVIEW_TABLE = 'ReviewTable'; 
// const TEST_TABLE = 'TestTable'; 


const getReview = async() => {
    const params = {
        TableName: REVIEW_TABLE
    };
    const review = await dynamoClient.scan(params).promise(); 
    console.log(review);
    return review;
};

const getReviewById = async (id) => {
  const params = {
    TableName: REVIEW_NAME,
    Key: {
      id
    }
  };
  return await dynamoClient.get(params).promise();
}

const addOrUpdateReview = async (review) => {
  const params = {
    TableName: REVIEW_TABLE, 
    Item: review,
  };
  return await dynamoClient.put(params).promise(); 
}

const deleteReview = async (review) => {
  const params = {
    TableName: REVIEW_TABLE,
    Item: review
  };
  return await dynamoClient.delete(params).promise(); 
}

module.exports = {
  getReview, 
  getReviewById,
  addOrUpdateReview, 
  deleteReview
}

//getUser();
const review1 = {
    "reviewID" : "123", 
    "postDate" : 123
}

addOrUpdateReview(review1); 
getReview();
