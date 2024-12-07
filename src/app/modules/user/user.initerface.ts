import { Model, Types } from 'mongoose';

import { IAdmin } from '../admin/admin.interface';
import { IEvent } from '../event/event.interface';
import { IEventManager } from '../event_manager/event_manager.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  passwordChangedAt?: Date;
  eventManager?: Types.ObjectId | IEventManager;
  event?: Types.ObjectId | IEvent;
  admin?: Types.ObjectId | IAdmin;
};

export type IUserMethods = {

 isUserExist(id:string):Promise<Partial<IUser>|null>;
 isPasswordMatched(givenPassword:string, savePassword:string):Promise<boolean>

}

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>,IUserMethods>;
