import mongoose from 'mongoose';
import config from './config/index';
import app from './app';
import { logger, errorlogger } from './shared/loger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`Database connected successfully`);

     app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    errorlogger.error('Database failed', error);
  }

  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        errorlogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
