import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { regexConstants } from '../../../../constants/regex.constants';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @IsInt()
  @Min(16)
  @Max(100)
  bio: string;

  @IsString()
  @IsEmail()
  @Matches(regexConstants.EMAIL)
  email: string;

  @IsString()
  @Matches(regexConstants.PASSWORD)
  password: string;
}
