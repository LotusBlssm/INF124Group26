// INSTRUCTION FOR AWS CONNECTION: 
// npm install aws-sdk --save (DON'T PUSH THIS WORK)

// I think this is all we need for this file?
import AWS from 'aws-sdk';
AWS.config.update({ region: 'us-east-2' });
export const dynamoClient = new AWS.DynamoDB.DocumentClient(); 
// EOF


// const secret = "..."; // made up the scret password for jwt

// const AWS = require('aws-sdk');
// AWS_ACCESS_KEY_ID='';
// // AWS_SECRET_ACCESS_KEY='';
// import AWS from 'aws-sdk';
// import dotenv from 'dotenv';


// Delete this key before pushing the work


// AWS.config.update({
//   region: process.env.AWS_DEFAULT_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACESS_KEY
// }) 

// // Users DynamoDB
// const usersDynamoDB = new AWS.DynamoDBDocumentClient.from(new DynamoDBclient({
//   region: 'us-east-1', // or your region
//   credential: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   },
// }));

// // Reviews DynamoDB
// const reviewsDynamoDB = new AWS.DynamoDBDocumentClient.from(new DynamoDBclient({
//   region: 'us-east-1', // or your region
//   credential: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   },
// }));

// module.exports = { userDynamoDB, reviewsDynamoDB }; 

// const listTables = async () => {
//   try {
//     const data = await client.send(new ListTablesCommand({}));
//     console.log("DynamoDB connection OK. Tables:", data.TableNames);
//   } catch (err) {
//     console.error("Error connecting to DynamoDB:", err.message);
//   }
// };
AWS.config.update({ 
    region: 'us-east-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient(); 
// const USER_TABLE = 'UserTable'; 
// const REVIEW_TABLE = 'ReviewTable'; 
const ZOTEXP_TABLE_USER = "ZotEXPTableUser";
const ZOTEXP_TABLE_REVIEW = "ZotEXPTableReview";

// const TEST_TABLE = 'TestTable';  


const getUser = async() => {
    const params = {
        TableName: ZOTEXP_TABLE_USER
    };
    const user = await dynamoClient.scan(params).promise(); 
    console.log(user);
    return user;
};

const addOrUpdateReview = async (review) => {
  const params = {
    TableName: ZOTEXP_TABLE_USER,
    Item: review,
  };
  return await dynamoClient.put(params).promise(); 
}

const addOrUpdateUser = async (user) => {
    const params = {
        TableName: ZOTEXP_TABLE_USER,
        Item: user,
    };
    return await dynamoClient.put(params).promise();
}
//getUser();
const user = {
    "userID" : 123,
    "username" : "Kenny Kim"
}

addOrUpdateUser(user);
getUser(); 


// const listTables = async () => {
//   try {
//     const data = await client.send(new ListTablesCommand({}));
//     console.log("DynamoDB connection OK. Tables:", data.TableNames);
//   } catch (err) {
//     console.error("Error connecting to DynamoDB:", err.message);
//   }
// };

// async function main() {
//     const putItem = new putItem ({
//         TableName: USER_TABLE,
//         Item: {
//             userID: {
//                 "N": 1
//             },
//             username: {
//                 "S": "ZotEXPTestUser"
//             }
//         }
//     })

//     await client.send(putItem);
// }

// main()
//     .catch(err => console.log(err))

// SOME WORK RELATED TO DB (login)...

// LOG IN USER
// const loginUser = async (req, res) => {
//   const { email, password } = req.body; 

//   AWS.config.update(config.aws_remote_config); 
//   const docClient = new AWS.DynamoDB.DocumentClient(); 

//   const params = {
//     TableName: config.aws_table_name, 
//     Key: { userID } // primary key for Users 
//   };

//   try {
//     const data = await docClient.get(params).promise(); 
//     const user = data.Item; 

//     if (!user) {
//       return res.status(401).json({ success: false, message: "User not found" });
//     }

//     const token = jwt.sign({ userID: user.id }, secret, {expiresIn: '1h'})

//     res.josn({ success : true, token }); 
//   } catch (err) {
//     console.error("Login error:", err); 
//     res.status(500).json({ success : false, message : "Internal Server Error" });
//   }
// };



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
//   } catch (err) {
//     console.error(err); 
//     res.status(500).send("Error Fetching User"); 

//   }});