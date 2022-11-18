import { IsString } from 'class-validator';

class CreateRestaurantDto {
  @IsString()
  public logo: string;

  @IsString()
  public address: string;

  @IsString()
  public hours: string;

  @IsString()
  public contact: string;

	@IsString()
	public franchiseId: string;
}

export { CreateRestaurantDto };
