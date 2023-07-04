import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TweetDocument = Tweet & Document;

@Schema()
export class Tweet {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: Types.ObjectId })
  userId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  followers: string[];
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
