import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';

@Injectable()
export class UsersService {
  public async create(createUserDto: CreateUserDto):Promise<string> {
    return 'This action adds a new user';
  }

  public async findAll():Promise<string> {
    return `This action returns all users`;
  }

  public async findOne(id: number):Promise<string> {
    return `This action returns a #${id} user`;
  }

  public async update(id: number, updateUserDto: UpdateUserDto):Promise<string> {
    return `This action updates a #${id} user`;
  }

  public async remove(id: number):Promise<string> {
    return `This action removes a #${id} user`;
  }
}
