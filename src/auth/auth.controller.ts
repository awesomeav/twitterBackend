import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/me') // added jwt guard
  getAllUsers(@Req() req: Request) {
    return this.authService.getAllUsers();
  }
  @Post('/signup')
  signup(@Body() signupDto: SignupDto): any {
    return this.authService.signUp(signupDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    console.log('email---- :');

    return this.authService.login(loginDto);
  }
}
