const { ScanCommand } = require('@aws-sdk/lib-dynamodb');
const docClient = require('../dynamoClient.js');

// GET REIVEWS DB
const getUsers = function (req, res) {
  AWS.config.update(config.aws_remote_config);

  const docClient = new AWS.DynamoDB.DocumentClient(); 

  const params = {
    TableName: config.aws_table_name
  };

  docClient.scan(params, function (err, data) {

    if (err) {
      console.log(err)
      res.send({
        success: false, 
        message: err
      });
    } else {
      const { Items } = data; 
      res.send({
        success: true, 
        users: Items
      });
    }
  });
}