import express from 'express';
import * as reviewController from '../controllers/reviewController.js';

const router = express.Router(); 

router.get('/:id', reviewController.getReview);
router.post('', reviewController.addReview); 
router.put('/:id', reviewController.updateReview); 
router.delete('/:id', reviewController.deleteReview);

export { router };
