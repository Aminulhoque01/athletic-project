import { z } from 'zod';

const eventValidated = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
    }),

    eventDate: z.string(),

    eventLocation: z.string(),

    participants: z.string().optional(),

    
  }),
});

export const EventValidation = {
   eventValidated,
};
