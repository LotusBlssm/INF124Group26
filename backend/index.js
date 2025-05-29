import express from "express"
const app = express();
const port = 3000;

app.get('/api/user/:id', (req, res) => {
    //TODO: fetch our database and send the user data 
});

app.get('/api/reviews/:id', (req, res) => {
	//TODO: fetch the reviews from our database (id is the id of the game whose reviews we want)
});

app.get('/api/game/:id', (req, res) => {
	//TODO: fetch the game info from igdb 
});

app.listen(port, ()=>{
	console.log(`Server is running on port ${port}.`);
});