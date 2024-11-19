import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetManyDto } from './dto/get-many.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  getAll(getManyDto: GetManyDto) {
    const where = getManyDto.filters;
    const { page, pageSize } = getManyDto;
    const take = pageSize;
    let skip;
    if (typeof page === 'number' && typeof pageSize === 'number') {
      skip = page * pageSize;
    }

    return this.usersRepository.getAllUsers(where, take, skip);
  }

  async getOne(id: string) {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new HttpException(
        `Not found user with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.updateUser(id, updateUserDto);
    if (!user) {
      throw new HttpException(
        `Not found user with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  remove(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  getList() {
    return this.usersRepository.getAllUsers();
  }
}
