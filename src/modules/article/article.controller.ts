import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { ArticleListRequestDto } from './models/dto/request/article-list.request.dto';
import { CreateArticleRequestDto } from './models/dto/request/create-article.request.dto';
import { UpdateArticleRequestDto } from './models/dto/request/update-article.request.dto';
import { ArticleListResponseDto } from './models/dto/response/article-list.response.dto';
import { ArticleResponseDto } from './models/dto/response/article-response.dto';
import { ArticleService } from './services/article.service';

@ApiTags('Article')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @SkipAuth()
  @Get()
  public async getArticleList(
    @Query() query: ArticleListRequestDto,
  ): Promise<ArticleListResponseDto> {
    return await this.articleService.getArticleList(query);
  }

  @ApiBearerAuth()
  @Post()
  public async createArticle(
    @Body() dto: CreateArticleRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<ArticleResponseDto> {
    return await this.articleService.createArticle(dto, userData);
  }

  @SkipAuth()
  @Get(':articleId')
  public async getArticleById(
    @Param('articleId', ParseUUIDPipe) articleId: string,
  ): Promise<ArticleResponseDto> {
    return await this.articleService.getArticleById(articleId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Put(':articleId')
  public async editArticleById(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @Body() dto: UpdateArticleRequestDto,
    @CurrentUser() userData: IUserData,
  ): Promise<ArticleResponseDto> {
    return await this.articleService.editArticleById(articleId, userData, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Delete(':articleId')
  public async deleteArticleById(
    @Param('articleId', ParseUUIDPipe) articleId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.articleService.deleteArticleById(articleId, userData);
  }
}
