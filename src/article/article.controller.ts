import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { CreateArticleDTO } from './dto/create-article.dto';
import { ArticleDocument } from './schema/article.schema';
import { UpdateArticleDTO } from './dto/update-article-dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('api/articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard())
  async CreateArticle(
    @Body()
    article: CreateArticleDTO,
    @Req() req,
  ): Promise<ArticleDocument> {
    return this.articleService.createArticle(article, req.user);
  }

  @Get(':slug')
  async getArticle(
    @Param('slug')
    slug: string,
  ): Promise<ArticleDocument> {
    const article = await this.articleService.findBySlug(slug);

    return article;
  }

  @Put(':slug')
  @UseGuards(AuthGuard())
  async updateArticle(
    @Body()
    updateArticleDto: UpdateArticleDTO,
    @Param('slug')
    slug: string,
    @Req() req,
  ): Promise<ArticleDocument> {
    const id = req.user.id;

    return await this.articleService.updateBySlug(slug, updateArticleDto, id);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard())
  async deleteArticle(@Param('slug') slug: string, @Req() req) {
    const id = req.user.id;

    return await this.articleService.deleteBySlug(slug, id);
  }

  @Get()
  async listArticles(
    @Query('tag') tag: string,
    @Query('author') author?: string,
  ): Promise<ArticleDocument[]> {
    return await this.articleService.getAllArticles(tag, author);
  }

  @Post(':slug/comments')
  @UseGuards(AuthGuard())
  async addCommentArticle(
    @Param('slug') slug: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
  ) {
    return await this.articleService.createComment(
      slug,
      createCommentDto,
      req.user,
    );
  }

  @Get('/:slug/comments')
  async getComments(@Param('slug') slug: string) {
    return this.articleService.getCommentBySlug(slug);
  }

  @Delete('/:slug/comments')
  @UseGuards(AuthGuard())
  async deleteComment(@Param('slug') slug: string, @Req() req) {
    const id = req.user.id;

    return await this.articleService.deleteCommentBySlug(slug, id);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard())
  async favoriteArticle(@Param('slug') slug: string, @Req() req) {
    const id = req.user.id;

    return this.articleService.favouriteArticle(slug, id);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard())
  async UnfavoriteArticle(@Param('slug') slug: string, @Req() req) {
    const id = req.user.id;

    return this.articleService.unfavoriteArticle(slug, id);
  }
}
