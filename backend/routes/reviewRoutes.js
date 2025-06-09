const express = requires('express'); 
const { getReviews } = requires('./controllers/reviewControllers'); 

const router = express.Router(); 

router.get('/:id', reviewController.getReview);
router.post('', reviewController.addReview); 
router.put(':/id', reviewController.updateReview); 
router.delete(':/id', reviewController.deleteReview);

module.exports = router;