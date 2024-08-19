import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { IncomeModule } from './modules/income/income.module';
import { ExpenseModule } from './modules/expense/expense.module';

@Module({
  imports: [AuthModule, UserModule, IncomeModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
