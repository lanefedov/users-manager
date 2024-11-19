import {
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';

export interface WhereUserInput extends Prisma.UserWhereInput {}
class WhereUserDto implements WhereUserInput {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @Transform(({ value }) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date;
  })
  @IsDate()
  @IsOptional()
  createdAt?: Date | string;

  @Transform(({ value }) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date;
  })
  @IsDate()
  @IsOptional()
  updatedAt?: Date | string;

  @Transform(({ value }) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date;
  })
  @IsDate()
  @IsOptional()
  deletedAt?: Date | string;
}
export class GetManyDto {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  pageSize?: number;

  @ValidateNested({ each: true })
  @Type(() => WhereUserDto)
  @IsOptional()
  filters?: WhereUserDto;
}
