import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/modules/auth/guards';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@Req() req: any) {
    return this.userService.findUserById(req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
