import { dynamoClient } from "../dynamoClient.js";

const {getUser, getUserById, addOrUpdateUser, deleteUser} = require('../dynamoClient.js'); 

export const getUser =  async (req, res) => {
    //TODO: fetch our database and send the user data 
    const id = req.params.id; 
    try {
        const review = await getUserById(id); 
        res.jsaon(user); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'error: failed to get user'});
    }

};

export const addUser = async (req, res) => {
    //TODO: add the new user in our database
    const review = req.body; 
    try {
        const newUser= await addOrUpdateReview(user);
        res.jsaon(newUser); 
    } catch (error) {
        console.error(err); 
        res.status(500).json({err: 'error: failed to add new user'});
    }
  };

export const updateUser = async (req, res) => {
	//TODO: update the user in our database
    const user = req.body; 
    const {id} = req.params; 
    review.id = id;
    try {
        const updatedUser = await addOrUpdateReview(user);
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
    try {
        res.json(await deleteUser(id)); 
    } catch (err) {
        console.error(err); 
        res.status(500).json({err: "failed to delete"});
    }
};