// import {
//   generateAdminId,
//   generateFacultyId,
//   generateStudentId,
// } from './user.utils';
import httpStatus from 'http-status-codes';

import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { User } from './user.model';
import { generateAdminId, generateEventId } from './user.utils';
import config from '../../../config';
import { IAdmin } from '../admin/admin.interface';
import { IUser } from './user.initerface';
import { Admin } from '../admin/admin.model';
import { IEvent } from '../event/event.interface';
import { Event } from '../event/event.models';
import { IEventManager } from '../event_manager/event_manager.interface';
import { EventManager } from '../event_manager/event_manager.model';


// create_manager

const eventManager = async (
  eventManager: IEventManager,
  user: IUser
): Promise<IUser | null> => {
  // set role

  user.role = 'event_manager';
  // eslint-disable-next-line no-useless-catch
  try {
    //array
    const newEventManage = await EventManager.create([eventManager]);

    if (!newEventManage.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
  } catch (error) {
    throw error;
  }

  const createdUser = await User.create(user);

  if (!eventManager) {
    throw new ApiError(400, 'Failed to create user');
  }
  return createdUser;
};

//create Event

const createEvent = async (
  event: IEvent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // set role
  user.role = 'event';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateEventId();
    user.id = id;
     

    const newEvent = await Event.create([event], { session });

    if (!newEvent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.event = newEvent[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

//create Admin
const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  // set role
  user.role = 'admin';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateAdminId();
    user.id = id;
    // admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    // user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id });
  }

  return newUserAllData;
};

export const UserServices = {
  eventManager,
  createEvent,
  createAdmin,
};
