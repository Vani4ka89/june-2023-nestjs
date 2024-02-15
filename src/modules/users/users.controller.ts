import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiTags()
  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<string> {
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
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return await this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<string> {
    return await this.usersService.remove(+id);
  }
}
