import { UserEntity } from '../../../database/entities/user.entity';
import { ResponseUserDto } from '../models/dto/response/response-user.dto';

export class UserMapper {
  public static toResponseDto(userEntity: UserEntity): ResponseUserDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      bio: userEntity.bio,
      email: userEntity.email,
      image: userEntity.image,
    };
  }
}
