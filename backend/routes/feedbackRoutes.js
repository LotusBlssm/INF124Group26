import express from 'express';
import * as feedbackController from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/:id', feedbackController.getFeedback);
router.post('/', feedbackController.addFeedback); 

export { router };

