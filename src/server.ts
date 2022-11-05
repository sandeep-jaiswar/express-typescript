import 'dotenv/config';
import * as express from 'express';
import * as mongoose from 'mongoose';
import App from './app';
import PostsController from 'posts/posts.controller';
import AuthenticationController from 'authentication/authentication.controller';
import validateEnv from 'utils/validateEnv';

validateEnv();

const app = new App([
	new PostsController(),
	new AuthenticationController()
]);

app.listen();
