import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import { createConnection } from 'typeorm';
import config from 'ormconfig';
import * as multer from 'multer';

class App {
	public app: express.Application;
	public upload: any;

  constructor(controllers: Controller[]) {
		this.app = express();
		this.upload = multer();
    //this.connectToTheDatabase();
		this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
		this.app.use(express.static('public'));
		this.app.use(this.upload.array('files_arr',10));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
	}

  private async connectToTheDatabase() {
    try {
      await createConnection(config);
      console.log('database connected successFully');
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
  }
}

export default App;
