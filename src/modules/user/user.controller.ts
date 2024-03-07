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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UpdateUserRequestDto } from './models/dto/request/update-user.request.dto';
import { ResponseUserDto } from './models/dto/response/response-user.dto';
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiBearerAuth()
  @Get('me')
  public async findMe(
    @CurrentUser() userData: IUserData,
  ): Promise<ResponseUserDto> {
    return await this.usersService.findMe(userData);
  }

  @ApiBearerAuth()
  @Put('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<ResponseUserDto> {
    return await this.usersService.updateMe(userData, dto);
  }

  @SkipAuth()
  @Get(':id')
  public async getPublicUser(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<ResponseUserDto> {
    return await this.usersService.getPublicUser(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @Post(':userId/follow')
  public async follow(
    @Param('userId', ParseUUIDPipe) userId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.follow(userId, userData);
  }

  @ApiBearerAuth()
  @Delete(':userId/follow')
  public async unFollow(
    @Param('userId', ParseUUIDPipe) userId: string,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.unFollow(userId, userData);
  }
}
