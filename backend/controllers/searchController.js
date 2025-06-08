import { dynamoClient } from "../dynamoClient.js";

export const getSearchResults = async (req, res) => {
    // TODO: get the games lol
    const query = req.query.query;
    console.log('getSearchResults from searchController called');
    console.log('query is ' + query);
    res.status(200).json({ myData: 'hello from searchController' });
}