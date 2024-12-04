/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status'
// import { generateFacultyId } from './app/modules/user/user.utils';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(cookieParser());
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes

// app.use('/api/v1/users', routes);
// app.use('/api/v1/academic-semester', );

// app.use('/api/v1/', );

//testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // Promise.reject(new Error('Unhaled promise Rejection'))
  // // console.log(x)
  //   throw new Error('testing error loger');
  
  // next('error');
  res.send('database working successfully')
});

// Global error handler

app.use(globalErrorHandler);

//handle not fund

// app.use((req: Request, res:Response, next: NextFunction) => {

//   res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: 'Not-Found',
//     errorMessages: [
//       {
//         path: '.',
//         message: 'API Not Fund',
//       },
//     ],
//   });
//   next();
// });

// const testId = async () => {
//   const tesId = await generateFacultyId();
//   console.log(tesId);
// };
// testId();

export default app;
