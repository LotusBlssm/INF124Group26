// INSTRUCTION FOR AWS CONNECTION: 
// npm install aws-sdk --save (DON'T PUSH THIS WORK)

// Import statements
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

// Grab environment variables
AWS.config.update({ 
    region: 'us-east-2',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
});

// Actually create the DynamoDB client
export const dynamoClient = new AWS.DynamoDB.DocumentClient(); 

// const secret = "..."; // made up the scret password for jwt