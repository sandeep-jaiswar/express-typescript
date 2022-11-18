import { NextFunction, Request, Response, Router } from 'express';
import Controller from 'interfaces/controller.interface';
import * as S3 from 'aws-sdk/clients/s3';
import RequestWithFile from 'interfaces/RequestWithFile.interface';
import { CreateFileDto } from 'dto/file.dto';
import { getRepository } from 'typeorm';
import NotFoundException from 'exceptions/NotFoundException';
import Files from 'entities/file.entity';

const bucketName = process.env.AWS_PRIVATE_BUCKET_NAME;

const region = process.env.AWS_BUCKET_REGION;

const accessKeyId = process.env.AWS_ACCESS_KEY;

const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

class FileController implements Controller {
  public path = '/files';
  public router = Router();
  private fileRepository = getRepository(Files);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.createFiles);
  }

  private createFiles = async (
    request: RequestWithFile,
    response: Response
  ) => {
    const results = [];
    const s3 = new S3({
      region,
      accessKeyId,
      secretAccessKey,
    });
    for (let index = 0; index < request.files.length; index++) {
      const element = request.files[index];
      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_PRIVATE_BUCKET_NAME,
          Body: element['buffer'],
          Key: `${Date.now()}-${element['originalname']}`,
        })
        .promise();
      const { Location } = uploadResult;
			const fileData: CreateFileDto = {
        url: Location,
			};
			const newFile = this.fileRepository.create(fileData);
      const data = await this.fileRepository.save(newFile);
      results.push(data);
    }
    response.send(results);
  };
}

export default FileController;
