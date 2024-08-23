import { ExpenseEntity } from 'src/modules/expense/entities/expense.entity';
import { IncomeEntity } from 'src/modules/income/entities/income.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum CategoryType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  color: string;

  @Column({ type: 'enum', enum: CategoryType, enumName: 'category_type' })
  type: CategoryType;

  @OneToMany(() => ExpenseEntity, (expenses) => expenses.category)
  expenses: ExpenseEntity[];

  @OneToMany(() => IncomeEntity, (icome) => icome.category)
  incomes: IncomeEntity[];
}
