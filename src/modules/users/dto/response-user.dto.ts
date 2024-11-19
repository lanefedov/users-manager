import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({
    nullable: false,
    description: "User's id",
    type: String,
    example: 'ff77016b-b822-4b2b-875a-f3cf3695ca8f',
    required: true,
  })
  id: string;

  @ApiProperty({
    nullable: false,
    description: "User's first name",
    type: String,
    example: 'Лев',
    required: true,
  })
  firstName: string;

  @ApiProperty({
    nullable: true,
    description: "User's last name",
    type: String,
    example: 'Нефедов',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    nullable: false,
    description: 'User created at',
    type: 'string',
    example: '2024-11-18T15:25:10.275Z',
    required: true,
  })
  createdAt: string;

  @ApiProperty({
    nullable: false,
    description: 'User updated at',
    type: 'string',
    example: '2024-11-18T15:25:10.275Z',
    required: true,
  })
  updatedAt: string;

  @ApiProperty({
    nullable: false,
    description: 'User deleted at',
    type: 'string',
    example: '2024-11-18T15:25:10.275Z',
    required: true,
  })
  deletedAt: string;
}
