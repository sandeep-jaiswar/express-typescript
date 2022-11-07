import { NextFunction, Request, Response, Router } from 'express';
import userModel from 'features/users/user.model';
import Controller from 'interfaces/controller.interface';

class ReportController implements Controller {
  public path = '/reports';
  public router = Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.generateReport);
  }

  private generateReport = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const usersByCountries = await this.user.aggregate([
      {
        $match: {
          'address.country': {
            $exists: true,
          },
        },
      },
      {
        $group: {
          _id: {
            country: '$address.country',
          },
          users: {
            $push: {
              _id: '$_id',
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'users._id',
          foreignField: '_id',
          as: 'users',
        },
      },
    ]);
    response.send({
      usersByCountries,
    });
  };
}

export default ReportController;
