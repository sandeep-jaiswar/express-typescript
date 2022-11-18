import { IsString } from 'class-validator';

class CreatePlayerDto {
  @IsString()
  public name: string;
}

export { CreatePlayerDto };
