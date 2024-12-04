// import { AcademicSemester } from '../academicSemester/academicSemesteModel';
// import { IStudent } from '../student/student.interface';


// import {
//   generateAdminId,
//   generateFacultyId,
//   generateStudentId,
// } from './user.utils';
import httpStatus from 'http-status';
// import { Student } from '../student/student.model';


// import { Faculty } from '../faculty/faculty.model';
// import { IFaculty } from '../faculty/faculty.interface';
// import { IAcademicSemester } from '../academicSemester/academicSemester.interface';

import mongoose from "mongoose";
import ApiError from "../../../errors/ApiError";
import { User } from "./user.model";
import { generateAdminId, generateEventId,  } from "./user.utils";
import config from "../../../config";
import { IAdmin } from "../admin/admin.interface";
import { IUser } from "./user.initerface";
import { Admin } from "../admin/admin.model";
import { IEvent } from '../event/event.interface';
import { Event } from '../event/event.models';


// const createStudent = async (
//   student: IEvent,
//   user: IUser
// ): Promise<IUser | null> => {
//   //auto generated incremental id
//   //  const id = await generateFacultyId();
//   // user.id = id;

//   //default password

//   // if (!user.password) {
//   //   user.password = config.default_student_pass as string;
//   // }

//   // set role
//   user.role = 'student';
//   const academicSemester = await AcademicSemester.findById(
//     student.academicSemester
//   ).lean();
//   // findOne({id:student.academicSemester})
//   // generate student Id
//   let newUserAllData = null;

//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     const id = await generateStudentId(academicSemester as IAcademicSemester);
//     user.id = id;
//     student.id = id;

//     //array
//     const newStudent = await Student.create([student], { session });

//     if (!newStudent.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
//     }

//     //set student --> _id into user.student
//     user.student = newStudent[0]._id;
//     const newUser = await User.create([user], { session });

//     if (!newUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed user created');
//     }

//     newUserAllData = newUser[0];

//     await session.commitTransaction();
//     await session.endSession();
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw error;
//   }

//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
//       path: 'student',
//       populate: [
//         {
//           path: 'academicSemester',
//         },
//         {
//           path: 'academicDepartment',
//         },
//         {
//           path: 'academicFaculty',
//         },
//       ],
//     });
//   }

//   return newUserAllData;
//   // const createdUser = await User.create(user);

//   // if (!createStudent) {
//   //   throw new ApiError(400, 'Failed to create user');
//   // }
//   // return createdUser;
// };

//create Event

const createEvent = async (
  faculty: IEvent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // set role
  user.role = 'faculty';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateEventId();
    user.id = id;
    // faculty.id = id;

    const newFaculty = await Event.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.faculty = newFaculty[0]._id;

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
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.admin = newAdmin[0]._id;

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
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserServices = {
  // createStudent,
   createEvent,
  createAdmin,
};
