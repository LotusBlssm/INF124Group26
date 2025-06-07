import { dynamoClient } from "../dynamoClient.js";

export const getGame = (req, res) => {
    // TODO: get the game lol
    const id = req.params.id;
    console.log('id: ' + id);
    console.log('getGame() in backend controller called. Fetching from database...')
    res.send({myData : 'hello from gameController'});
}