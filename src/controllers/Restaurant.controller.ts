import { CreateRestaurantDto } from 'dto/restaurant.dto';
import Franchise from 'entities/franchise.entity';
import Restaurant from 'entities/restaurant.entity';
import NotFoundException from 'exceptions/NotFoundException';
import { NextFunction, Request, Response, Router } from 'express';
import Controller from 'interfaces/controller.interface';
import { getRepository } from 'typeorm';

class RestaurantController implements Controller {
  public path = '/restaurant';
  public router = Router();
  private restaurantRepository = getRepository(Restaurant);
  private franchiseRepository = getRepository(Franchise);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllRestaurant);
    this.router.post(this.path, this.createRestaurant);
    this.router.get(`${this.path}/:id`, this.getRestaurantById);
    this.router.patch(`${this.path}/:id`, this.modifyRestaurant);
    this.router.delete(`${this.path}/:id`, this.deleteRestaurant);
  }

  private createRestaurant = async (request: Request, response: Response) => {
    const { franchiseId } = request.body;
    const franchiseData = await this.franchiseRepository.findOne({
      where: { id: parseInt(franchiseId) },
    });
    const restaurantData: CreateRestaurantDto = request.body;
    const newRestaurant = this.restaurantRepository.create({
      ...restaurantData,
      franchise: franchiseData,
    });
		const data = await this.restaurantRepository.save(newRestaurant);
    response.send(data);
  };

  private getAllRestaurant = async (request: Request, response: Response) => {
    const data = await this.restaurantRepository.find();
    response.send(data);
  };

  private getRestaurantById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const data = await this.restaurantRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (data) {
      response.send(data);
    } else {
      next(new NotFoundException(id));
    }
  };

  private modifyRestaurant = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const restaurantData: Restaurant = request.body;
    await this.restaurantRepository.update(id, restaurantData);
    const updatedRestaurant = await this.restaurantRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (updatedRestaurant) {
      response.send(updatedRestaurant);
    } else {
      next(new NotFoundException(id));
    }
  };

  private deleteRestaurant = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const deleteResponse = await this.restaurantRepository.delete(id);
    if (deleteResponse.raw[1]) {
      response.sendStatus(200);
    } else {
      next(new NotFoundException(id));
    }
  };
}

export default RestaurantController;
