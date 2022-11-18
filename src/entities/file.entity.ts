import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Files {
  @PrimaryGeneratedColumn()
  public id?: number;

	@Column()
	url: string;
}

export default Files;
