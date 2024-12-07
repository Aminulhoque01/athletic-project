import mongoose, { Schema } from 'mongoose';
import { Event_manager, IEventManager } from './event_manager.interface';

const EventManagerSchema = new Schema<IEventManager>(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EventManager = mongoose.model<IEventManager, Event_manager>(
  'EventManager',
  EventManagerSchema
);
