import express from 'express';


import { UserController } from "./user.controller";
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

 

 
 


const router = express.Router();


// router.post(
//   '/create-event',
//       validateRequest(UserValidation.createAdminZodSchema),
//   UserController.createEvent
// );

router.post(
  '/create-eventManager',
    //   validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createEvent_Manager
);

router.post(
  '/create-admin',
    validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRouters = router;
