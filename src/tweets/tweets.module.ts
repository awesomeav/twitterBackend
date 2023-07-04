import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { TweetSchema } from './schemas/tweets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tweet', schema: TweetSchema }]),
    AuthModule, // Assuming you have an AuthModule for JWT authentication
  ],
  controllers: [TweetsController],
  providers: [TweetsService],
})
export class TweetsModule {}
