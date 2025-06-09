import { dynamoClient } from "../dynamoClient.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// USER FUNCTIONS 

const USER_TABLE = "UserTable";
const JWT_SECRET = process.env.JWT_SECRET;

export const getUser =  async (req, res) => {
    // TODO: get the game lol
    const id = req.params.id;
    const params = {
        TableName: USER_TABLE,
        Key: { userID: id }
    }

    try {
        const data = await dynamoClient.get(params).promise(); 
        if (!data.Item) {
            console.log('404');
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('200');
        res.json(data.Item);
      } catch (err) {
        console.log('500');
        console.error('DynamoDB error:', err);
        res.status(500).json({ error: 'Could not retrieve user in GET request' });
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

    if(!user.password){
        return res.status(400).json({error: 'Password is required. You wouldn\'t want to make an unsecure account, would you?'})
    }

    try {
        // SaltRounds is a variable that is passed in as a parameter to control the amount of time
        //       that is spent on hashing a password.
        // Normally, the values are between 10-12, and I don't think it needs to be incredibly secure
        // I want to prioritize runtime > security, higher saltRounds results in longer run times. 
        //      Feel free to change if need be!
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
    } catch (err) {
        return res.status(404).json({error: 'There was an error with hashing the password.'})
    }

    try {
        const newUser = await dynamoClient.put(params).promise();
        if (!data.Item) {
            console.log('404');
            return res.status(404).json({ error: 'User not added' });
        }
        console.log('200');
        res.json(data.Item);
      } catch (err) {
        console.log('500');
        console.error('DynamoDB error:', err);
        res.status(500).json({ error: 'error during addUser POST request' });
      }
  };

export const updateUser = async (req, res) => {
	//TODO: update the user in our database
    const user = req.body; 
    const {id} = req.params; 
    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }
        user.id = id;

    const params = {
        TableName: USER_TABLE,
        Item: user
    }

    try {
        // Same as above
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
    } catch (err) {
        return res.status(404).json({error: 'There was an error with hashing the password.'})
    }

    try {
        const updatedUser = await dynamoClient.get(params).promise();
        if (!updatedUser.Item) {
            console.log('404');
            return res.status(404).json({ error: 'User not added' });
        }
        console.log('200');
        res.json(updatedUser.Item);
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'user update error'});
    }
  };


// delete user
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
        res.status(500).json({err: "failed to delete user"});
    }
};

// LOGIN a user
export const loginUser = async (req, res) => {

    const { userID, password } = req.body;

    if (!userID || !password) {
        return res.status(400).json({ error: 'username and password are required' });
    }
    // Should I split this error code into two different ones ? 
    //        i.e username is required/not found, password is requried

    const params = {
        TableName: USER_TABLE,
        Key: { userID }
    };

    try {
        const result = await dynamoClient.get(params).promise();
        const user = result.Item;

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        //Comparing hashes for the passwords. 
        //  Returns an error code if the passwords (credentials) are not found
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        //Generating JWT
        const token = jwt.sign({userID: user.userID}, JWT_SECRET, {expiresIn: '4h'});

        res.status(200).json({ message: 'Login successful', token, user});
        // IMPORTANT!!! 
        //      Sends the token back to the front end for it to be stored .. I think?

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
};