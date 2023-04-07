import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './schema/article.schema';
import { UserModule } from 'src/user/user.module';
import { CommentSchema } from './schema/comment.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: 'Article', schema: ArticleSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
