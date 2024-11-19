import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { User } from '@prisma/client';
import { CreateUserInput } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { WhereUserInput } from '../dto/get-many.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(data: CreateUserInput): Promise<User> {
    return this.databaseService.user.create({
      data,
    });
  }

  async getAllUsers(
    where: WhereUserInput = {},
    skip?: number,
    take?: number,
  ): Promise<User[]> {
    return this.databaseService.user.findMany({
      where: {
        deletedAt: null,
        ...where,
      },
      skip,
      take,
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return this.databaseService.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.databaseService.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
