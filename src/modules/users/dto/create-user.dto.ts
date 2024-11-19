import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export interface CreateUserInput extends Prisma.UserCreateInput {}
export class CreateUserDto implements CreateUserInput {
  @ApiProperty({
    nullable: false,
    description: "User's first name",
    type: String,
    example: 'Лев',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    nullable: true,
    description: "User's last name",
    type: String,
    example: 'Нефедов',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName?: string;
}
