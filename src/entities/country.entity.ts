import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Country {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  name: string;
}

export default Country;
