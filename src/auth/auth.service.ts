import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcyrpt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  getAllUsers() {
    const users = this.userModel.find({});
    return users;
  }
  async signUp(signUpDto: SignupDto) {
    const { email, name, password } = signUpDto;
    const hashedPassword = await bcyrpt.hash(password, 10);
    const user = await this.userModel.create({
      email,
      name,
      password: hashedPassword,
    });
    // const accessToken = this.jwtService.sign({
    //   id: user._id,
    // });
    return { user: user };
  }
  async login(logindto: LoginDto) {
    const { email, password } = logindto;
    console.log('email :', email);
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('invalid email');
    }
    const isPasswordValid = await bcyrpt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password not matched');
    }
    const token = this.jwtService.sign({ id: user._id });

    return { token: token, user: user };
  }
}
