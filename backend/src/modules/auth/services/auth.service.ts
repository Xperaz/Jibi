import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from '../dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signUp(authDto: AuthDto) {
    const existingUser = await this.userService.findUserByEmail(authDto.email);

    if (!existingUser) {
      const hash = await argon.hash(authDto.password);

      const newUser = await this.userService.createUser({
        fullName: authDto.fullName,
        email: authDto.email,
        password: hash,
      });

      const savedUser = await this.userService.saveUser(newUser);

      return this.signToken(savedUser.id, savedUser.email);
    }

    throw new ConflictException('This email already in use');
  }

  async signIn(authDto: AuthDto) {
    const user = await this.userService.findUserByEmail(authDto.email);

    if (!user) {
      throw new ForbiddenException('Credentials Incorrect!');
    }

    const isPwMatches = await argon.verify(user.password, authDto.password);

    console.log(isPwMatches);

    if (!isPwMatches) {
      throw new ForbiddenException('Credentials Incorrect!');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.configService.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: '7d', // Set the expiration time to 1 hour
    });

    return {
      access_token: token,
    };
  }
}
