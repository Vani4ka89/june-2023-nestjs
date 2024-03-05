import {
  ConflictException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CacheCustom } from '../../../common/decorators/cache-method.decorator';
import { UserRepository } from '../../repository/services/user.repository';
import { BaseUserRequestDto } from '../dto/request/base-user.request.dto';
import { UpdateUserRequestDto } from '../dto/request/update-user.request.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(createUserDto: BaseUserRequestDto): Promise<any> {
    Logger.log(createUserDto);
    return 'This action adds a new user';
  }

  public async findAll(): Promise<string> {
    return `This action returns all user`;
  }

  @CacheCustom(5000)
  public async findOne(id: number): Promise<string> {
    `This action returns a #${id} user`;
    throw new UnprocessableEntityException('User not found');
  }

  public async update(
    id: number,
    updateUserDto: UpdateUserRequestDto,
  ): Promise<string> {
    Logger.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  public async remove(id: number): Promise<string> {
    return `This action removes a #${id} user`;
  }

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException();
    }
  }
}