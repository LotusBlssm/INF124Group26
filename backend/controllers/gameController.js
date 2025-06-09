import { dynamoClient } from "../dynamoClient.js";
// import { Game } from "../../ZotExp/src/app/Classes/game/game";

async function getReviews(reviewIDs, docClient) {
    // Helper function that will search for an array of reviews
    const getParams = {
        RequestItems: {
            ['ReviewTable']: {
                Keys: reviewIDs
            }
        }
    }
    return (await docClient.batchGet(getParams, function(err, data) { 
        if (err) console.log('int500 - ', err); 
        // else console.log('int200 - ', data); 
    }).promise())['Responses']['ReviewTable'];
}

async function getUsers(userIDs, docClient) {
    // Helper function that will search UserTable for multiple users
    const getParams = {
        RequestItems: {
            ['UserTable']: {
                Keys: userIDs.map(userID => ({'userID': userID})),
                AttributesToGet: ['username', 'profileImage']
            }
        }
    }
    return (await docClient.batchGet(getParams, function(err, data) { 
        if (err) console.log('int500 - ', err); 
        // else console.log('int200 - ', data); 
    }).promise())['Responses']['UserTable'];
}

export const getGame = async (req, res) => {
    // Query the GameTable by the req's ID, then find reviews/users associated with it
    
    // Prep initial GameTable query
    const id = req.params.id;
    console.log('getGame() in backend controller called. Fetching from database game with id', id);
    const params = {
        TableName: 'GameTable',
        Key: { gameID: id }
    }

    // Go through with database query(s)
    try {
        // Actual GameTable GET request
        const gameData = await dynamoClient.get(params).promise();
        if (!gameData.Item) {
            console.log('404');
            return res.status(404).json({ error: 'Game not found' });
        }
        console.log('200 - Retrieved game data', gameData.Item);
        // Now we've got the game, can we grab the review(s) and user(s) associated with it?

        // Initialize the review/user arrays before processing...
        let gameReviewData = [];
        let gameReviewUserData = [];
        if (gameData.Item.reviews.length == 0) {
            // No, so we'll have our review/user lists just be empty arrays
            console.log("404 - No reviews to grab");
        } else {
            // Make the batch query for all the reviews...
            const gameReviewData = await getReviews(gameData.Item.reviews, dynamoClient);
            if (!gameReviewData) {
                console.log("404 - Couldn't grab reviews");
            } else {
                console.log("200 - Grabbed reviews ", gameReviewData);
            }
            // Now can we get the users corresponding to each review?

            // First we'll need to build a list of userIDs from the reviews...
            const gameReviewUserIDs = [];
            for (let i = 0; i < gameReviewData.length; i++) {
                gameReviewUserIDs[i] = gameReviewData[i]['user_id'];
            } // There's definitely a cleaner way to do this with .map() or something...
            // console.log("gameReviewUserIDs: ", gameReviewUserIDs);

            // Then, we can send off our batch query for all these users
            const gameReviewUsersData = await getUsers(gameReviewUserIDs, dynamoClient);
            if (!gameReviewUsersData) {
                console.log("404 - Couldn't grab reviews' users");
            } else {
                console.log("200 - Grabbed reviews' users ", gameReviewUsersData);
            }
        }

        // Generate & fill the resulting Game object
        let gameReturn = {
            id : id,
            title : gameData.Item.title,
            imageURL : gameData.Item.imageURL,
            company : gameData.Item.company,
            releaseDate : new Date(gameData.Item.releaseDate),
            description : gameData.Item.description,
            rating : gameData.Item.rating,
            gameTags : gameData.Item.gameTags,
            userTags : gameData.Item.userTags,
            reviews : gameReviewData
        }
        // Now we've got our final return object, let's send it back
        res.json(gameReturn);

    } catch (err) {
        console.error('500 - DynamoDB error:', err);
        res.status(500).json({ error: 'Could not retrieve game' });
    }
}