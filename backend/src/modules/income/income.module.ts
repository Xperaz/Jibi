import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeEntity } from './entities/income.entity';
import { IncomeService } from './services/income.service';
import { IncomeController } from './controllers/income.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeEntity])],
  providers: [IncomeService],
  controllers: [IncomeController],
  exports: [IncomeService, TypeOrmModule],
})
export class IncomeModule {}
