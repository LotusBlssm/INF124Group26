import { dynamoClient } from "../dynamoClient.js";

export const getGame = async (req, res) => {
    // TODO: get the game lol
    const id = req.params.id;
    console.log('id: ' + id);
    console.log('getGame() in backend controller called. Fetching from database...')

    const params = {
        TableName: 'GameTable',
        Key: { gameID: id }
    }

    try {
        const data = await dynamoClient.get(params).promise();
        if (!data.Item) {
            console.log('404');
            return res.status(404).json({ error: 'Game not found' });
        }
        console.log('200');
        res.json(data.Item);
      } catch (err) {
        console.log('500');
        console.error('DynamoDB error:', err);
        res.status(500).json({ error: 'Could not retrieve game' });
      }
}