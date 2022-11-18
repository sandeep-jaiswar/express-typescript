import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Franchise from './franchise.entity';

@Entity()
class Restaurant {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public logo: string;

  @Column()
  public address: string;

  @Column()
  public hours: string;

  @Column()
  public contact: string;

  @ManyToOne(() => Franchise, (franchise: Franchise) => franchise.restaurants)
  public franchise: Franchise;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;
}

export default Restaurant;
