import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CacheCustom } from '../../../common/decorators/cache-method.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserRequestDto } from '../models/dto/request/update-user.request.dto';
import { ResponseUserDto } from '../models/dto/response/response-user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  @CacheCustom(5000)
  public async findMe(userData: IUserData): Promise<ResponseUserDto> {
    const entity = await this.userRepository.findOneBy({ id: userData.userId });
    return UserMapper.toResponseDto(entity);
  }

  public async updateMe(
    useData: IUserData,
    dto: UpdateUserRequestDto,
  ): Promise<ResponseUserDto> {
    const entity = await this.userRepository.findOneBy({ id: useData.userId });
    await this.userRepository.save(this.userRepository.merge(entity, dto));
    return UserMapper.toResponseDto(entity);
  }

  public async getPublicUser(userId: string): Promise<ResponseUserDto> {
    const entity = await this.userRepository.findOneBy({ id: userId });
    if (!entity) {
      throw new UnprocessableEntityException();
    }
    return UserMapper.toResponseDto(entity);
  }

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException();
    }
  }
}
