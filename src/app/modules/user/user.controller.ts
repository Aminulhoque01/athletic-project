// import { RequestHandler, Response, Request } from 'express';
// import { UserServices } from './user.services';

// import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status-codes';
// import { IUser } from './user.initerface';

import { Request, RequestHandler, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.initerface";
import catchAsync from "../../../shared/catchAsync";
import { UserServices } from "./user.services";

// const createStudent: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { student, ...userData } = req.body;
//     const result = await UserServices.createStudent(student, userData);

//     sendResponse<IUser>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'user created successfully',
//       data: result,
//     });
//   }
// );

const createEvent_Manager : RequestHandler = catchAsync(async(req:Request, res:Response)=>{
  const {event_manager, ...userData} = req.body;
  const result = await UserServices.eventManager(event_manager, userData);

  sendResponse<IUser>(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'event_manager created successfully',
    data: result
  })
})

const createEvent: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { event, ...userData } = req.body;
    const result = await UserServices.createEvent(event, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);

const createAdmin: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserServices.createAdmin(admin, userData);
    
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);

export const UserController = {
  createEvent_Manager,
  createEvent,
  createAdmin,
};
