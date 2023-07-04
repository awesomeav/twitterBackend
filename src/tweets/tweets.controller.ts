// tweets.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Request,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TweetsService } from './tweets.service';
import { CreateTweetDto, UpdateTweetDto } from './dto/tweet.dto';

@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllTweets() {
    return this.tweetsService.getAllTweets();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getTweetById(@Param('id') id: string) {
    return this.tweetsService.getTweetById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createTweet(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetsService.createTweet(createTweetDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  updateTweet(@Param('id') id: string, @Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetsService.updateTweet(id, updateTweetDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteTweet(@Param('id') id: string) {
    return this.tweetsService.deleteTweet(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/follow')
  followUser(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.tweetsService.followUser(id, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/unfollow')
  unfollowUser(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.tweetsService.unfollowUser(id, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('timeline')
  getTimeline(@Request() req) {
    const userId = req.user.id;
    return this.tweetsService.getTimeline(userId);
  }
}
