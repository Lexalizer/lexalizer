import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NoDefaultAuth } from './auth.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @NoDefaultAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() login: { username: string; userId: string; password: string }
  ) {
    return this.authService.login(login);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
