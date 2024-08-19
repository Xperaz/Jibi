import { Module } from '@nestjs/common';
import { ExpenseController } from './modules/expense/controllers/expense/expense.controller';
import { ExpenseController } from './controllers/expense/expense.controller';

@Module({
  controllers: [ExpenseController]
})
export class ExpenseModule {}
