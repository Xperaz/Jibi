import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/modules/auth/guards';

@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@Req() req: any) {
    return req.user;
  }
}
