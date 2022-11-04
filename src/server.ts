import * as express from 'express';
import * as bodyParser from 'body-parser';

const router = express.Router();

function loggerMiddleware(
	request: express.Request,
	response: express.Response,
	next,
) {
	console.log(`${request.method} ${request.path}`);
	next();
}

const app = express();

router.get('/hello', (request, response) => {
	response.send('Hello world!');
});

app.use('/api', router);

app.use(loggerMiddleware);
app.use(bodyParser.json());

app.get('/', (request, response) => {
	response.send({
		hostname: request.hostname,
		path: request.path,
		method: request.method,
	});
});

app.listen(5000);
