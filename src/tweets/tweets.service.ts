// tweets.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetDto, UpdateTweetDto } from './dto/tweet.dto';
import { Tweet, TweetDocument } from './schemas/tweets.schema';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel('Tweet')
    @InjectModel('User')
    private readonly tweetModel: Model<TweetDocument>,
  ) {}

  async getAllTweets(): Promise<Tweet[]> {
    return this.tweetModel.find().populate('user');
  }

  async getTweetById(id: string): Promise<Tweet> {
    return this.tweetModel.findById(id).exec();
  }

  async createTweet(createTweetDto: CreateTweetDto): Promise<Tweet> {
    const createdTweet = new this.tweetModel(createTweetDto);
    return createdTweet.save();
  }

  async updateTweet(
    id: string,
    updateTweetDto: UpdateTweetDto,
  ): Promise<Tweet> {
    return this.tweetModel
      .findByIdAndUpdate(id, updateTweetDto, { new: true })
      .exec();
  }

  async deleteTweet(id: string): Promise<Tweet> {
    return this.tweetModel.findByIdAndRemove(id).exec();
  }

  async followUser(tweetId: string, userId: string): Promise<Tweet> {
    return this.tweetModel.findByIdAndUpdate(
      tweetId,
      { $addToSet: { followers: userId } },
      { new: true },
    );
  }

  async unfollowUser(tweetId: string, userId: string): Promise<Tweet> {
    return this.tweetModel.findByIdAndUpdate(
      tweetId,
      { $pull: { followers: userId } },
      { new: true },
    );
  }

  async getTimeline(userId: string): Promise<Tweet[]> {
    return this.tweetModel.find({ followers: userId }).exec();
  }
}
