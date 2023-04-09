/* eslint-disable prettier/prettier */
import { IsEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDTO {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsEmpty()
  readonly slug: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly body: string;

  @IsEmpty()
  readonly tagList: string[];

  @IsEmpty()
  readonly favorited: string[];

  @IsEmpty()
  readonly favoritesCount: number;
}
