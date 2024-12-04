import { Model } from "mongoose";

export type IEvent = {
  eventID: number;
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  participants: string[];

  registerAthlete(athlete: string): void;
  viewEventDetails(): string;
  updateEventDetails(details: Partial<IEvent>): void;
};

export type EventModel = Model<IEvent, Record<string, unknown>>;