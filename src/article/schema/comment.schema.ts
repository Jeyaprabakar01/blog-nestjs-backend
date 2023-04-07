/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Article } from './article.schema';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type CommentDocument = Comment & Document;

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop()
  body: string[];

  @Prop()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
  article: Article;

  @Prop()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
