import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UserDocument } from '../user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './schema/article.schema';
import { CreateArticleDTO } from './dto/create-article.dto';
import { Model } from 'mongoose';
import { UpdateArticleDTO } from './dto/update-article-dto';
import { Comment, CommentDocument } from './schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<ArticleDocument>,
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,
  ) {}

  // Create Article
  async createArticle(
    createArticleDto: CreateArticleDTO,
    user: UserDocument,
  ): Promise<ArticleDocument> {
    const slug = createArticleDto.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 50);
    const article = await new this.articleModel({
      ...createArticleDto,
      user,
      slug,
    });

    return article.save();
  }

  // Get Article
  async findBySlug(slug: string): Promise<ArticleDocument> {
    const article = await this.articleModel.findOne({ slug });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  //update Article
  async updateBySlug(
    slug: string,
    updateArticleDto: UpdateArticleDTO,
    userId: string,
  ): Promise<ArticleDocument> {
    const article = await this.articleModel.findOne({ slug });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.user.toString() !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this article',
      );
    }

    if (updateArticleDto.title) {
      const newSlug = updateArticleDto.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 50);
      article.slug = newSlug;
    }

    Object.assign(article, updateArticleDto);

    return await article.save();
  }

  //Delete Article
  async deleteBySlug(slug: string, userId: string) {
    const article = await this.articleModel.findOne({ slug });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.user.toString() !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this article',
      );
    }

    await this.articleModel.deleteOne({ slug });

    return 'Article deleted successfully';
  }

  //List Articles
  async getAllArticles(
    tag: string,
    author: string,
  ): Promise<ArticleDocument[]> {
    const query: any = {};

    if (tag) {
      query.tagList = tag;
    }

    if (author) {
      query.user = author;
    }

    return await this.articleModel.find(query);
  }

  //Add Comments to an Article
  async createComment(
    slug: string,
    createCommentDto: CreateCommentDto,
    user: UserDocument,
  ) {
    const article = await this.articleModel.findOne({ slug });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const comment = new this.commentModel({
      ...createCommentDto,
      article,
      user,
    });

    await comment.save();

    return comment;
  }

  //Get Comments from an Article
  async getCommentBySlug(slug: string): Promise<CommentDocument[]> {
    const article = await this.articleModel.findOne({ slug });

    return this.commentModel.find({ article: article._id });
  }

  //Delete comment
  async deleteCommentBySlug(slug: string, userId: string) {
    const article = await this.articleModel.findOne({ slug });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.user.toString() !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this comment',
      );
    }

    await this.articleModel.deleteOne({ slug });

    return 'comment deleted successfully';
  }
}
