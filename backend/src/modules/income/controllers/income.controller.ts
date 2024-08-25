import { Controller, Post } from '@nestjs/common';

@Controller('income')
export class IncomeController {
  @Post('add')
  addIncome() {
    return 'adding income controller';
  }
}
