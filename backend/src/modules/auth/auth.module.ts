import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStatergy } from './strategies';

@Module({
  imports: [UserModule, JwtModule.register({})],
  providers: [AuthService, JwtStatergy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
