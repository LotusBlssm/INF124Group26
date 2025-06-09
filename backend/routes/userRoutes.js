import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', userController.getUser);
router.post('', userController.addUser);
router.put('/:id', userController.UpdateUser);
router.delete('/:id', userController.deleteUser);


export { router };

