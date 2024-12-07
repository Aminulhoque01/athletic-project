import { Model } from "mongoose";

export type IEventManager ={
  eventId: string; 
  eventName: string; 
  description?: string;
  date: Date; 
  location: string;
  organizer: string;
  createdAt?: Date; 
  updatedAt?: Date; 
}

export type Event_manager = Model<IEventManager, Record<string, unknown>>;