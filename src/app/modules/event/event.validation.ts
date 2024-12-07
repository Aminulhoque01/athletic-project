import { z } from 'zod';

const eventValidated = z.object({
  body: z.object({
    eventID: z.number({
      required_error: 'Event id is required',
    }),
    eventName: z.string({
      required_error: 'event name is required',
    }),
    eventDate: z.date({
      required_error: 'eventDate is required',
    }),
    eventLocation: z.string({
      required_error: 'event Location is required',
    }),

    
  }),
});

export const EventValidation = {
   eventValidated,
};
