const express = requires('express'); 
const { getUsers } = requires('./controllers/userControllers'); 

const router = express.Router(); 

router.get('./users', getUsers); 

module.exports = router;