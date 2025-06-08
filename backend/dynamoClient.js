// INSTRUCTION FOR AWS CONNECTION: 
// npm install aws-sdk --save (DON'T PUSH THIS WORK)

// I think this is all we need for this file?
import AWS from 'aws-sdk';
AWS.config.update({ region: 'us-east-2' });
export const dynamoClient = new AWS.DynamoDB.DocumentClient(); 
// EOF

AWS.config.update({ 
    region: 'us-east-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY
});

// const secret = "..."; // made up the scret password for jwt

// const AWS = require('aws-sdk');
// AWS_ACCESS_KEY_ID='';
// // AWS_SECRET_ACCESS_KEY='';
// import AWS from 'aws-sdk';
// import dotenv from 'dotenv';


// USER FUNCTIONS 
const getUser = async() => {
    const params = {
        TableName: USER_TABLE
    };
    const review = await dynamoClient.scan(params).promise(); 
    console.log(review);
    return review;
};

const getUserById = async (id) => {
  const params = {
    TableName: USER_NAME,
    Key: {
      id
    }
  };
  return await dynamoClient.get(params).promise();
}

const addOrUpdateUser = async (user) => {
  const params = {
    TableName: USER_TABLE, 
    Item: user,
  };
  return await dynamoClient.put(params).promise(); 
}

const deleteUser = async (user) => {
  const params = {
    TableName: USER_TABLE,
    Item: user
  };
  return await dynamoClient.delete(params).promise(); 
}


// REVIEW FUNCTIONS 
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
  // user functions:
  getUser,
  getUserById,
  addOrUpdateUser,
  deleteUser,
  
  // game review functions: 
  getReview, 
  getReviewById,
  addOrUpdateReview, 
  deleteReview
}



