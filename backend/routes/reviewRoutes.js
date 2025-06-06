const express = requires('express'); 
const { getReviews } = requires('./controllers/reviewControllers'); 

const router = express.Router(); 

router.get('./reviews', getReviews); 

module.exports = router;