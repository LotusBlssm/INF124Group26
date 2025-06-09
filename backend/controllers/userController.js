import { dynamoClient } from "../dynamoClient.js";
// USER FUNCTIONS 

USER_TABLE = "UserTable";
export const getUser =  async (req, res) => {
    // TODO: get the game lol
    const id = req.params.id;
    const params = {
        TableName: USER_TABLE,
        Key: { userID: id }
    }

    try {
        const data = await dynamoClient.put(params).promise(); 
        if (!data.Item) {
            console.log('404');
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('200');
        res.json(data.Item);
      } catch (err) {
        console.log('500');
        console.error('DynamoDB error:', err);
        res.status(500).json({ error: 'Could not retrieve game' });
      }
};

export const addUser = async (req, res) => {
    // TODO: get the game lol
    const user = req.body; 
    console.log('id: ' + user.userID);
    console.log('addUser() in backend controller called. Fetching from database...')

    const params = {
        TableName: USER_TABLE,
        Item: user
    }

    try {
        const newUser = await dynamoClient.get(params).promise();
        if (!data.Item) {
            console.log('404');
            return res.status(404).json({ error: 'User not added' });
        }
        console.log('200');
        res.json(data.Item);
      } catch (err) {
        console.log('500');
        console.error('DynamoDB error:', err);
        res.status(500).json({ error: 'Could not retrieve game' });
      }
  };

export const updateUser = async (req, res) => {
	//TODO: update the user in our database
    const user = req.body; 
    const {id} = req.params; 
    user.id = id;
    const params = {
        TableName: USER_TABLE,
        Item: user
    }
    try {
        const updatedUser = await dynamoClient.get(params).promise();
        if (!data.Item) {
            console.log('404');
            return res.status(404).json({ error: 'User not added' });
        }
        console.log('200');
        res.json(data.Item);
        res.jsaon(updatedUser); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'review error'});
    }
  };


// delete Review
export const deleteUser = async (req, res) =>{
    //TODO: delete the user
    const {id} = req.params; 
    const params = {
        TableName: USER_TABLE,
        Item: user
    };
    try {
        res.json(await dynamoClient.delete(params).promise()); 
    } catch (err) {
        console.error(err); 
        res.status(500).json({err: "failed to delete"});
    }
};