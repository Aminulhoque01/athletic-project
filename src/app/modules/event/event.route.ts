import express from 'express';
import { EventController } from './event.conroller';
import { UserController } from '../user/user.controller';

const router = express.Router()

router.post('/create-event', UserController.createEvent);
router.get('/', EventController.getAllEvent);
router.get('/:id', EventController.getSingleEvent);
router.patch("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);

export const EventRoute = router;
