import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Restaurant from './restaurant.entity';

@Entity()
class Franchise {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name: string;

  @Column()
  public created_by: string;

  @OneToMany(() => Restaurant, (restaurant: Restaurant) => restaurant.franchise)
  public restaurants: Restaurant[];

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;
}

export default Franchise;
