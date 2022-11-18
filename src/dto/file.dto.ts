import { IsString } from 'class-validator';

class CreateFileDto {
  @IsString()
  public url: string;
}

export { CreateFileDto };
