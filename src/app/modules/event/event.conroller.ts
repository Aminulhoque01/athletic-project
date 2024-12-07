import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { EventFilterableFields } from './event.constant';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationFilds';
import sendResponse from '../../../shared/sendResponse';
import { IEvent } from './event.interface';
import { EventService } from './event.services';
import httpStatus from 'http-status-codes';


const getAllEvent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, EventFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await EventService.getAllEvent(filters, paginationOptions);

  sendResponse<IEvent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all event successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleEvent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = EventService.getSingleEvent(id);

  sendResponse<IEvent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event retrieved successfully !',
    data: result,
  });
});

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await EventService.eventUpdate( id, updatedData );

  sendResponse<IEvent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'EventData update successfully',
    data: result,
  });
});

const deleteEvent = catchAsync(async(req:Request, res:Response)=>{
   const id = req.params.id;
   const result = await EventService.eventDelete(id);

   sendResponse<IEvent>(res,{
    statusCode:httpStatus.OK,
    success:true,
    message: 'Event deleted successfully',
    data: result,
   })
});

export const EventController = {
  getAllEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent
};
