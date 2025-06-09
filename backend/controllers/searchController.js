import { dynamoClient } from "../dynamoClient.js";

const CLIENT_ID = '';
const AUTHORIZATION = '';

export const getSearchResults = async (req, res) => {
    // TODO: get the games lol
    const query = req.query.query;
    console.log('getSearchResults from searchController called');
    console.log('query is ' + query);

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
            id: v.id,
            title: v.name,
            imageURL: v.cover,
            company: (v.involved_companies ? v.involved_companies[0] : 'Unknown'),
            releaseDate: new Date(v.first_release_date * 1000),
            description: v.summary,
            rating: null,
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
            body: `fields id, url; where id = (${imageIDs});`
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
            body: `fields company; where id = (${companyIDs});`
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
            body: `fields name; where id = (${companyIDs});`
        }
    );

    companyResults = await companyResults.json();

    console.log('hmmm');
    console.log(gameTagIDs);
    let gameTagResults = await fetch(
        "https://api.igdb.com/v4/keywords",
        { 
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': CLIENT_ID,
                'Authorization': AUTHORIZATION,
            },
            body: `fields name; where id = (${gameTagIDs});`
        }
    );

    gameTagResults = await gameTagResults.json();

    let imageMap = new Map();
    for (let imageResult of imageResults) {
        imageMap.set(imageResult.id, imageResult.url);
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
        console.log(v.company)
        return {
            ...v, 
            imageURL: imageMap.get(v.imageURL),
            company: companyMap.get(preCompanyMap.get(v.company)),
            gameTags: v.gameTags.map(t => gameTagMap.get(t)).filter(t => t)
        }
    })

    // TODO: put this data in the database (post if new, patch if old)

    res.status(200).json({ myData: 'hello from searchController' });
}