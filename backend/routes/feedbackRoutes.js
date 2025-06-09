import express from 'express';
import * as gameController from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/:id', feedbackController.getfeedback);
router.post('', feedbackContoller.addFeedback); 

export { router };

