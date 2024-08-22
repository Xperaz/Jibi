import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName?: string;
}
