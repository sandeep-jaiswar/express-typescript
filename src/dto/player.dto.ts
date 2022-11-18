import { IsArray, IsString } from 'class-validator';
import { Column } from 'typeorm';

class CreatePlayerDto {
  @IsString()
  public name: string;

  @IsString()
  public longName: string;

  @IsString()
  public mobileName: string;

  @IsString()
  public battingName: string;

  @IsString()
  public fieldingName: string;

  @IsString()
  public gender: string;

  @IsString()
  public playingRole: string;

  @IsArray()
  public battingStyles: string[];

  @IsArray()
  public bowlingStyles: string[];

  @IsArray()
  public longBattingStyles: string[];

  @IsArray()
  public longBowlingStyles: string[];

  @IsArray()
  public playingRoles: string[];

  public dateOfBirth: string;

  public urlId?: string[];
}

export { CreatePlayerDto };
