import { IsString } from 'class-validator';

class CreateFranchiseDto {
  @IsString()
  public name: string;

  @IsString()
  public created_by: string;
}

export { CreateFranchiseDto };
