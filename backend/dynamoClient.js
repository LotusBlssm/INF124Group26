const secret = "..."; // made up the scret password for jwt

const { AWS, putItem, getItem } = require('aws-sdk');

// AWS.config.update({
//   region: 'us-east-1', // or your region
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// Users DynamoDB
const usersDynamoDB = new AWS.DynamoDBDocumentClient.from(new DynamoDBclient({
  region: 'us-east-1', // or your region
  credential: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
}));

// Reviews DynamoDB
const reviewsDynamoDB = new AWS.DynamoDBDocumentClient.from(new DynamoDBclient({
  region: 'us-east-2', // or your region
  credential: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
}));

module.exports = { usersDynamoDB, reviewsDynamoDB }; 

const listTables = async () => {
  try {
    const data = await client.send(new ListTablesCommand({}));
    console.log("DynamoDB connection OK. Tables:", data.TableNames);
  } catch (err) {
    console.error("Error connecting to DynamoDB:", err.message);
  }
};

async function main() {
    const putItem = new putItem ({
        TableName: 'usersTable',
        Item: {
            userID: {
                "N": 1
            },
            username: {
                "S": "ZotEXPTestUser"
            }
        }
    })

    await client.send(putItem);
}

main()
    .catch(err => console.log(err))

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