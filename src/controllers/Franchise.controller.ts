import { CreateFranchiseDto } from 'dto/franchise.dto';
import Franchise from 'entities/franchise.entity';
import NotFoundException from 'exceptions/NotFoundException';
import { NextFunction, Request, Response, Router } from 'express';
import Controller from 'interfaces/controller.interface';
import { getRepository } from 'typeorm';

class FranchiseController implements Controller {
  public path = '/franchise';
  public router = Router();
  private franchiseRepository = getRepository(Franchise);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.createFranchise);
    this.router.get(this.path, this.getAllFranchise);
    this.router.get(`${this.path}/:id`, this.getFranchiseById);
    this.router.patch(`${this.path}/:id`, this.modifyFranchise);
    this.router.delete(`${this.path}/:id`, this.deleteFranchise);
  }

  private createFranchise = async (request: Request, response: Response) => {
    const franchiseData: CreateFranchiseDto = request.body;
    const newFranchise = this.franchiseRepository.create(franchiseData);
    const data = await this.franchiseRepository.save(newFranchise);
    response.send(data);
  };

  private getAllFranchise = async (request: Request, response: Response) => {
    const data = await this.franchiseRepository.find();
    response.send(data);
  };

  private getFranchiseById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const data = await this.franchiseRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (data) {
      response.send(data);
    } else {
      next(new NotFoundException(id));
    }
  };

  private modifyFranchise = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const franchiseData: Franchise = request.body;
    await this.franchiseRepository.update(id, franchiseData);
    const updatedFranchise = await this.franchiseRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (updatedFranchise) {
      response.send(updatedFranchise);
    } else {
      next(new NotFoundException(id));
    }
  };

  private deleteFranchise = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const deleteResponse = await this.franchiseRepository.delete(id);
    if (deleteResponse.raw[1]) {
      response.sendStatus(200);
    } else {
      next(new NotFoundException(id));
    }
  };
}

export default FranchiseController;
