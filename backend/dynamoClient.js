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



