import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import validateEnv from 'utils/validateEnv';
import { createConnection } from 'typeorm';
import config from 'ormconfig';
import FranchiseController from 'controllers/Franchise.controller';
import RestaurantController from 'controllers/Restaurant.controller';
import FileController from 'controllers/Files.controller';
import PlayerController from 'controllers/PlayerController.controller';

validateEnv();

(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App([
    new FranchiseController(),
    new RestaurantController(),
		new PlayerController(),
    new FileController(),
  ]);
  app.listen();
})();
