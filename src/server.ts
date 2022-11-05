import 'dotenv/config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import App from './app';
import PostsController from 'posts/posts.controller';

const router = express.Router();
const {MONGO_USER, MONGO_PASSWORD, MONGO_PATH} = process.env;
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);

// function loggerMiddleware(
// 	request: express.Request,
// 	response: express.Response,
// 	next,
// ) {
// 	console.log(`${request.method} ${request.path}`);
// 	next();
// }

const app = new App([new PostsController()]);

router.get('/hello', (request, response) => {
	response.send('Hello world!');
});

// app.use('/api', router);

// app.use(loggerMiddleware);

// app.get('/', (request, response) => {
// 	response.send({
// 		hostname: request.hostname,
// 		path: request.path,
// 		method: request.method,
// 	});
// });

app.listen();
