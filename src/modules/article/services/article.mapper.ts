import { ArticleEntity } from '../../../database/entities/article.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { ArticleResponseDto } from '../models/dto/response/article-response.dto';

export class ArticleMapper {
  public static toResponseDto(
    articleEntity: ArticleEntity,
  ): ArticleResponseDto {
    return {
      id: articleEntity.id,
      title: articleEntity.title,
      description: articleEntity.description,
      body: articleEntity.body,
      created: articleEntity.created,
      updated: articleEntity.updated,
      user: articleEntity.user
        ? UserMapper.toResponseDto(articleEntity.user)
        : null,
    };
  }
}
