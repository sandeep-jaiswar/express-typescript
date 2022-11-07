import UnauthorizedExcpetion from 'exceptions/UnauthorizedExcpetion';
import * as express from 'express';
import Controller from 'interfaces/controller.interface';
import RequestWithUser from 'interfaces/RequestWithUser.interface';
import authMiddleware from 'middleware/auth.middleware';
import postModel from 'features/posts/posts.model';

class UserController implements Controller {
  public path = '/users';
  public router = express.Router();
  private post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:id/posts`,
      authMiddleware,
      this.getAllPostsOfUser
    );
  }

  private getAllPostsOfUser = async (
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const userId = request.params.id;
    if (userId === request.user._id.toString()) {
      const posts = await this.post.find({ author: userId });
      response.send(posts);
    }
    next(new UnauthorizedExcpetion());
  };
}

export default UserController;
