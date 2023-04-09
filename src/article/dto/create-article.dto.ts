/* eslint-disable prettier/prettier */
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDTO {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsEmpty()
  readonly slug: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly body: string;

  @IsNotEmpty()
  readonly tagList: string[];

  @IsEmpty()
  readonly favorited: string[];

  @IsEmpty()
  readonly favoritesCount: number;
}
