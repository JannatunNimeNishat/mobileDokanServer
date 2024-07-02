import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userValidations } from './user.validation';
import { userController } from './user.controller';

const router =  express.Router();


//create user
router.post('/create-user',validateRequest(userValidations.createUserValidationSchema),userController.createUser)




export const userRoutes = router;