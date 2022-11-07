import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import AuthenticationController from 'authentication/authentication.controller';
import validateEnv from 'utils/validateEnv';
import UserController from 'features/users/user.controller';
import ReportController from 'features/reports/reports.controller';
import { createConnection } from 'typeorm';
import config from 'ormconfig';
import PostController from 'controllers/PostController.controller';

validateEnv();

(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App([
    new PostController(),
    new AuthenticationController(),
    new UserController(),
    new ReportController(),
  ]);
  app.listen();
})();
