require('dotenv').config();
const AWS = require('aws-sdk');
AWS_ACCESS_KEY_ID='';
AWS_SECRET_ACCESS_KEY='';
AWS.config.update({
  region: 'us-east-1', // or your region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
module.exports = dynamodb;