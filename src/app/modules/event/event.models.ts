import { model, Schema } from 'mongoose';
import { EventModel, IEvent } from './event.interface';

const EventSchema = new Schema<IEvent, EventModel>(
  {
    eventID: { type: Number, required: true, unique: true },
    eventName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventLocation: { type: String, required: true },
    participants: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);


export const Event = model<IEvent, EventModel>('Event', EventSchema);



// // Add Methods
// EventSchema.methods.registerAthlete = function (athlete: string): void {
//   if (!this.participants.includes(athlete)) {
//     this.participants.push(athlete);
//   }
// };

// EventSchema.methods.viewEventDetails = function (): string {
//   return `Event: ${this.eventName}, Date: ${this.eventDate.toISOString()}, Location: ${this.eventLocation}`;
// };

// EventSchema.methods.updateEventDetails = function (details: Partial<IEvent>): void {
//   Object.assign(this, details);
// };

// export const Event = mongoose.model<IEvent>('Event', EventSchema);
