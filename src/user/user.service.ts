import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    throw new Error('Not implemented');
  }

  async findAll(): Promise<[User[], number]> {
    const users = await User.findAndCount();

    return users;
  }

  async findOne(options: any): Promise<User> {
    const user = await User.findOne(options);

    if (!user) return null;

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    throw new Error('Not implemented');
  }

  remove(id: string) {
    throw new Error('Not implemented');
  }
}
