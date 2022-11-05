import HttpException from 'exceptions/HttpException';
import NotFoundException from 'exceptions/NotFoundException';
import * as express from 'express';
import validationMiddleware from 'middleware/validation.middleware';
import CreatePostDto from './post.dto';
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
    this.router.post(this.path, validationMiddleware(CreatePostDto), this.createAPost);
    this.router.patch(
      this.pathById,
      validationMiddleware(CreatePostDto, true),
      this.modifyPost
    );
    this.router.delete(this.pathById, this.deletePost);
  }

  private getAllPosts = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const allPosts = await PostModel.find();
		if (allPosts) {
      response.send(allPosts);
    } else {
      next(new HttpException(404, 'Post not found'));
    }
  };

  private createAPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const postData: Post = request.body;
    const createdPost = new PostModel(postData);
    const savedPost = await createdPost.save();
    response.send(savedPost);
  };

  private getPostById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const { id } = request.params;
		const post = await PostModel.findById(id);
		if (post) {
			response.send(post);
		} else {
			next(new NotFoundException(id))
		}

  };

  private modifyPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const { id } = request.params;
    const postData: Post = request.body;
    const post = await PostModel.findByIdAndUpdate(id, postData, { new: true });
    if (post) {
      response.send(post);
    } else {
      next(new NotFoundException(id));
    }
  };

  private deletePost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const { id } = request.params;
		const successResponse = await PostModel.findByIdAndDelete(id);
		if (successResponse) {
			response.send(200);
		} else {
			next(new NotFoundException(id));
    }
  };
}

export default PostsController;
