import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Player {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name: string;

  @Column()
  public longName: string;

  @Column()
  public mobileName: string;

  @Column()
  public battingName: string;

  @Column()
  public fieldingName: string;

  @Column()
  public gender: string;

  @Column()
  public playingRole: string;

  @Column('text', { array: true })
  public battingStyles: string[];

  @Column('text', { array: true })
  public bowlingStyles: string[];

  @Column('text', { array: true })
  public longBattingStyles: string[];

  @Column('text', { array: true })
  public longBowlingStyles: string[];

  @Column('text', { array: true })
  public playingRoles: string[];

  @Column('text', { array: true, default: '{}' })
  public dateOfBirth: string[];
}

export default Player;
