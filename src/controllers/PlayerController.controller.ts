import { NextFunction, Request, Response, Router } from 'express';
import { XMLHttpRequest } from 'xhr2';
import Controller from 'interfaces/controller.interface';
import Player from 'entities/player.entity';
import { getRepository } from 'typeorm';
import { CreatePlayerDto } from 'dto/player.dto';
import NotFoundException from 'exceptions/NotFoundException';
import Country from 'entities/country.entity';

interface externalData {
  total: string;
  results: Array<Object>;
  objects: Object;
}

class PlayerController implements Controller {
  public path = '/players';
  public router = Router();
  private playerRepository = getRepository(Player);
  private countryRepository = getRepository(Country);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
		this.router.get(`${this.path}/:id/:c`, this.insertPlayerDataIntoDatabase);
		this.router.get(`${this.path}`, this.getPlayersData);
  }

	private getPlayersData = async (request: Request, response: Response) => {
		const data = await this.playerRepository.find();
		response.send(data);
	};

  private insertPlayerDataIntoDatabase = async (
    request: Request,
    response: Response
  ) => {
    try {
      const results = [];
      const id = request.params.id;
			const c = request.params.c;
      const country = await this.countryRepository.save({
        name: c
      });
      for (let i = 0; i < 20; i++) {
        const res = await this.callExternalApi(i, id);
        const data = JSON.parse(`${res}`).results;
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          const playerData: CreatePlayerDto = element;
          const newPlayer = this.playerRepository.create({
            ...playerData,
            country,
          });
          const el = await this.playerRepository.save(newPlayer);
          results.push(el);
        }
      }
      response.send(results);
    } catch (error) {
      console.log(error);
      response.send(error);
    }
  };

  private callExternalApi = (i, id): Promise<externalData> => {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();
      req.open(
        'GET',
        `https://hs-consumer-api.espncricinfo.com/v1/pages/player/search?mode=BOTH&page=${i}&filterActive=true&filterTeamId=${id}&filterFormatLevel=INTERNATIONAL&sort=ALPHA_ASC`
      );
      req.onload = function () {
        if (req.status == 200) {
          resolve(req.response);
        } else {
          reject('There is an Error!');
        }
      };
      req.send();
    });
  };
}

export default PlayerController;
