import express from 'express';
import { UserRouters } from '../modules/user/user.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';

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
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
