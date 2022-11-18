import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Country from './country.entity';

@Entity()
class Player {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ManyToOne(() => Country)
  @JoinColumn()
  public country: Country;

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

  @Column('text', { array: true, default: [] })
  public battingStyles: string[];

  @Column('text', { array: true, default: [] })
  public bowlingStyles: string[];

  @Column('text', { array: true, default: [] })
  public longBattingStyles: string[];

  @Column('text', { array: true, default: [] })
  public longBowlingStyles: string[];

  @Column('text', { array: true, default: [] })
  public playingRoles: string[];

  @Column('text', { default: '', nullable: true })
  public dateOfBirth: string;

  @Column('text', { array: true, default: [] })
  public urlId?: string[];
}

export default Player;
