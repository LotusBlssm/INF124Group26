import { dynamoClient } from "../dynamoClient.js";

const CLIENT_ID = '';
const AUTHORIZATION = '';
const GAME_TABLE = '';

export const getSearchResults = async (req, res) => {
    const query = decodeURI(req.query.query);

    let searchResults = [];
    searchResults = await fetch(
        "https://api.igdb.com/v4/games",
        { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': CLIENT_ID,
                'Authorization': AUTHORIZATION,
            },
            body: `search "${query}"; fields *;`
        }
    );
    searchResults = await searchResults.json();
    searchResults = searchResults.map(v => {
        return {
            gameID: "" + v.id,
            title: v.name,
            imageURL: v.cover,
            company: (v.involved_companies ? v.involved_companies[0] : 'Unknown'),
            releaseDate: v.first_release_date
                ? new Date(v.first_release_date * 1000).getTime()
                : null,
            description: v.summary,
            rating: v.rating ? v.rating / 20 : 0,
            gameTags: v.keywords != undefined ? v.keywords : [],
            userTags: [],
            reviews: []
        }  
    });

    let imageIDs = [];
    let companyIDs = [];
    let gameTagIDs = [];

    for (let searchResult of searchResults) {
        imageIDs.push(searchResult.imageURL);
        if (searchResult.company != 'Unknown') {
            companyIDs.push(searchResult.company);
        }
        for (let gameTagID of searchResult.gameTags) {
            gameTagIDs.push(gameTagID);
        }
    }

    let imageResults = await fetch(
        "https://api.igdb.com/v4/covers",
        { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': CLIENT_ID,
                'Authorization': AUTHORIZATION,
            },
            body: `fields id, url; where id = (${imageIDs.filter(v => v)});`
        }
    );
    imageResults = await imageResults.json();
    
    let companyResults = await fetch(
        "https://api.igdb.com/v4/involved_companies",
        { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': CLIENT_ID,
                'Authorization': AUTHORIZATION,
            },
            body: `fields company; where id = (${companyIDs.filter(v => v)});`
        }
    );
    companyResults = await companyResults.json();
    
    companyIDs = companyResults.map(v => v.company);
    let preCompanyMap = new Map();
    for (let companyResult of companyResults) {
        preCompanyMap.set(companyResult.id, companyResult.company);
    }

    companyResults = await fetch(
        "https://api.igdb.com/v4/companies",
        { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': CLIENT_ID,
                'Authorization': AUTHORIZATION,
            },
            body: `fields name; where id = (${companyIDs.filter(v => v)});`
        }
    );

    companyResults = await companyResults.json();

    let gameTagResults = await fetch(
        "https://api.igdb.com/v4/keywords",
        { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': CLIENT_ID,
                'Authorization': AUTHORIZATION,
            },
            body: `fields name; where id = (${gameTagIDs.filter(v => v)});`
        }
    );

    gameTagResults = await gameTagResults.json();

    let imageMap = new Map();
    for (let imageResult of imageResults) {
        if (imageResult.url != undefined) {
            imageMap.set(imageResult.id, imageResult.url);
        }
    }

    let companyMap = new Map();
    for (let companyResult of companyResults) {
        companyMap.set(companyResult.id, companyResult.name);
    }

    let gameTagMap = new Map();
    for (let gameTagResult of gameTagResults) {
        gameTagMap.set(gameTagResult.id, gameTagResult.name);
    }

    searchResults = searchResults.map(v => {
        return {
            ...v, 
            imageURL: v.imageURL != undefined ? "https://" +  imageMap.get(v.imageURL).substring(2) : undefined,
            company: v.company != 'Unknown' ? companyMap.get(preCompanyMap.get(v.company)) : 'Unknown',
            gameTags: v.gameTags.map(t => gameTagMap.get(t)).filter(t => t)
        }
    })

    const ids = searchResults.map(v => ({ gameID: v.gameID }));
    const params = {
    RequestItems: {
        [GAME_TABLE]: {
        Keys: ids
        }
    }
    };

    const existingItems = await dynamoClient.batchGet(params).promise();
    const existingIds = new Set(existingItems.Responses[GAME_TABLE].map(item => item.gameID));
    const toUpdate = searchResults.filter(v => existingIds.has(v.gameID));
    const toInsert = searchResults.filter(v => !existingIds.has(v.gameID));

    const existingIdsArr = Array.from(existingIds);
    if (existingIdsArr.length > 0) {
        const getParams = {
            RequestItems: {
              [GAME_TABLE]: {
                Keys:  existingIdsArr.map(gameID => ({ gameID }))
              }
            }
          };
          
        const existingSearchResults = await dynamoClient.batchGet(getParams).promise();
        // TODO: update searchResults

    }
    
    const putRequests = toInsert.map(v => ({
        PutRequest: {
            Item: v
        }
    }));
    if (putRequests.length > 0) {
        const writeParams = {
            RequestItems: {
                [GAME_TABLE]: putRequests
            }
        };
        await dynamoClient.batchWrite(writeParams).promise();
    }

    res.status(200).json({ searchResults });
}