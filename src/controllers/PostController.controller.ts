import Post from 'entities/post.entity';
import NotFoundException from 'exceptions/NotFoundException';
import * as express from 'express';
import CreatePostDto from 'features/posts/post.dto';
import Controller from 'interfaces/controller.interface';
import validationMiddleware from 'middleware/validation.middleware';
import { getRepository } from 'typeorm';

class PostController implements Controller {
  public path = '/posts';
  public router = express.Router();
  private postRepository = getRepository(Post);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      validationMiddleware(CreatePostDto),
      this.createPost
    );
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreatePostDto, true),
      this.modifyPost
    );
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }

  private createPost = async (
    request: express.Request,
    response: express.Response
  ) => {
    const postData: CreatePostDto = request.body;
    const newPost = this.postRepository.create(postData);
    await this.postRepository.save(newPost);
    response.send(newPost);
  };

  private getAllPosts = async (
    request: express.Request,
    response: express.Response
  ) => {
    const posts = await this.postRepository.find();
    response.send(posts);
  };

  private getPostById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const post = await this.postRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (post) {
      response.send(post);
    } else {
      next(new NotFoundException(id));
    }
  };

  private modifyPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const postData: Post = request.body;
    await this.postRepository.update(id, postData);
    const updatedPost = await this.postRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (updatedPost) {
      response.send(updatedPost);
    } else {
      next(new NotFoundException(id));
    }
  };

  private deletePost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const id = request.params.id;
    const deleteResponse = await this.postRepository.delete(id);
    if (deleteResponse.raw[1]) {
      response.sendStatus(200);
    } else {
      next(new NotFoundException(id));
    }
  };
}

export default PostController;
