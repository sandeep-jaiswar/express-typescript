import * as express from 'express';
import Post from './post.interface';
import PostModel from './posts.model';

class PostsController {
	public path = '/posts';
	public pathById = '/posts/:id';
	public router = express.Router();

	constructor() {
		this.intializeRoutes();
	}

	private intializeRoutes() {
		this.router.get(this.path, this.getAllPosts);
		this.router.get(this.pathById, this.getPostById);
		this.router.post(this.path, this.createAPost);
		this.router.patch(this.pathById, this.modifyPost);
		this.router.delete(this.pathById, this.deletePost);
	}

	private getAllPosts = async (
		request: express.Request,
		response: express.Response,
	) => {
		const allPosts = await PostModel.find();
		response.send(allPosts);
	};

	private createAPost = async (
		request: express.Request,
		response: express.Response,
	) => {
		const postData: Post = request.body;
		const createdPost = new PostModel(postData);
		const savedPost = await createdPost.save();
		response.send(savedPost);
	};

	private getPostById = async (
		request: express.Request,
		response: express.Response,
	) => {
		const {id} = request.params;
		const post = await PostModel.findById(id);
		response.send(post);
	};

	private modifyPost = async (
		request: express.Request,
		response: express.Response,
	) => {
		const {id} = request.params;
		const postData: Post = request.body;
		const post = await PostModel.findByIdAndUpdate(id, postData, {new: true});
		response.send(post);
	};

	private deletePost = async (
		request: express.Request,
		response: express.Response,
	) => {
		const {id} = request.params;
		await PostModel.findByIdAndDelete(id);
		response.send(200);
	};
}

export default PostsController;
