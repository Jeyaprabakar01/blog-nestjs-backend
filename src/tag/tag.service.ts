import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from 'src/article/schema/article.schema';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<ArticleDocument>,
  ) {}

  //List of Tags
  async getAllTags(): Promise<string[]> {
    const articles = await this.articleModel.find().exec();
    const tags = articles.flatMap((article) => article.tagList);
    const uniqueTags = Array.from(new Set(tags));
    return uniqueTags;
  }
}
