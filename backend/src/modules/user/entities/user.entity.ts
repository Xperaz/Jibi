import { ExpenseEntity } from 'src/modules/expense/entities/expense.entity';
import { IncomeEntity } from 'src/modules/income/entities/income.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => ExpenseEntity, (expense) => expense.user)
  expenses: ExpenseEntity[];

  @OneToMany(() => IncomeEntity, (incomes) => incomes.user)
  incomes: IncomeEntity[];
}
