import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetManyDto } from './dto/get-many.dto';
import { from, interval, map, switchMap } from 'rxjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "User's creation" })
  @ApiResponse({
    status: 201,
    type: ResponseUserDto,
    description: 'User has been successfully created',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Users list' })
  @ApiResponse({
    status: 200,
    type: [ResponseUserDto],
    description: 'All users',
  })
  getAll(@Body() getManyDto: GetManyDto) {
    return this.usersService.getAll(getManyDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'One user' })
  @ApiResponse({
    status: 200,
    type: [ResponseUserDto],
    description: 'Get one user',
  })
  getOne(@Param('id') id: string) {
    return this.usersService.getOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    type: [ResponseUserDto],
    description: 'Update user found by id',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    type: [ResponseUserDto],
    description: 'Set value for deletedAt',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Sse('sse')
  @ApiOperation({ summary: 'Users list' })
  @ApiResponse({
    status: 200,
    type: [ResponseUserDto],
    description: 'Get users list at interval',
  })
  getList() {
    return interval(5000).pipe(
      switchMap(() => from(this.usersService.getList())),
      map((users) => ({ data: users })),
    );
  }
}
