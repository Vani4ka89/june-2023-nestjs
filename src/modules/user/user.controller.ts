import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BaseUserRequestDto } from './dto/request/base-user.request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user.request.dto';
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  public async create(
    @Body() createUserDto: BaseUserRequestDto,
  ): Promise<string> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  public async findAll(): Promise<string> {
    return await this.usersService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<string> {
    return await this.usersService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<string> {
    return await this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<string> {
    return await this.usersService.remove(+id);
  }
}
