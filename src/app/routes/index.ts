import express from 'express';
import { UserRouters } from '../modules/user/user.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { EventRoute } from '../modules/event/event.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
 
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/event',
    route: EventRoute,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
