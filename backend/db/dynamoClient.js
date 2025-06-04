import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

import express from "express"
const app = express();
const port = 3000;

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

// app.get('/user/:id', async (req, res) => {
//   const userID = req.params.id; 
  
//   try {
//     const data = await dynamodb.send(new GetCommand({
//       TableName : 'Users', 
//       Key  : { id:UserID }
//     }));

//     if (data.Item) {
//       res.json(data.Item); 
//     }
//     else {
//       res.status(404).send('User Not Found'); 
//     }
//   } catch (err) {å
//     console.error(err); 
//     res.status(500).send("Error Fetching User"); 

//   }});