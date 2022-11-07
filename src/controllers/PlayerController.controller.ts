import { Request, Response, Router } from 'express';
import { XMLHttpRequest } from 'xhr2';
import Controller from 'interfaces/controller.interface';

interface externalData {
  total: string;
  results: Array<Object>;
  objects: Object;
}

class PlayerController implements Controller {
  public path = '/players/:id';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.insertPlayerDataIntoDatabase);
  }

  private insertPlayerDataIntoDatabase = async (
    request: Request,
    response: Response
  ) => {
    const pageId = request.params.id;
    const res = await this.callExternalApi(pageId);
    console.log(res)
    const { total } = JSON.parse(JSON.stringify(res));
    response.send({
      pageId,
      total,
    });
  };

  private callExternalApi = (id): Promise<externalData> => {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();
      req.open(
        'GET',
        `https://hs-consumer-api.espncricinfo.com/v1/pages/player/search?mode=BOTH&page=${id}&filterActive=true&filterTeamId=6&filterFormatLevel=ALL&sort=ALPHA_ASC`
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
