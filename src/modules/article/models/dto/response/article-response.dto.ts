import { ResponseUserDto } from '../../../../user/models/dto/response/response-user.dto';

export class ArticleResponseDto {
  id: string;

  title: string;

  description: string;

  body: string;

  created: Date;

  updated: Date;

  user?: ResponseUserDto;
}
