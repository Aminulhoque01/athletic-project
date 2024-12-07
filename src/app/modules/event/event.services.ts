import mongoose, { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGeneticResponse } from '../../../interfaceses/common';
import { IpaginationsOptions } from '../../../interfaceses/paginations';
import { EventFilterableFields } from './event.constant';
import { IEvent, IEventFilters } from './event.interface';
import { Event } from './event.models';
import httpStatus from 'http-status-codes'
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';

const getAllEvent = async (
  filters: IEventFilters,
  pagination: IpaginationsOptions
): Promise<IGeneticResponse<IEvent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: EventFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Event.find(whereConditions)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Event.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleEvent = async (id: string): Promise<IEvent | null> => {
  const result = await Event.findOne({ id });
  return result;
};

const eventUpdate= async(id:string, payload:Partial<IEvent>):Promise<IEvent|null>=>{
  const exist = await Event.findOne({id});

  if(!exist){
    throw new ApiError(httpStatus.NOT_FOUND,"Event not found")
  };

  const {eventName, ...eventData } = payload;


  const updatedEventData: Partial<IEvent> = { ...eventData };


  if (eventName && Object.keys(eventName).length > 0) {
    Object.keys(eventName).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IEvent>;
      (updatedEventData as any)[nameKey] = eventName[key as keyof typeof name];
    });
  }
  const result = await Event.findOneAndUpdate({ id }, updatedEventData, {
    new: true,
  });
  return result;

}

const eventDelete = async(id:string):Promise<IEvent | null>=>{

  const exist = await Event.findOne({id})

  if(!exist){
    throw new ApiError(httpStatus.NOT_FOUND,"Event not found");
  };

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //delete student first
    const Eventes = await Event.findOneAndDelete({ id }, { session });
    if (!Eventes) {
      throw new ApiError(404, 'Failed to delete event');
    }
    //delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return Eventes;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }

}


export const EventService = {
  getAllEvent,
  getSingleEvent,
  eventUpdate,
  eventDelete
};
