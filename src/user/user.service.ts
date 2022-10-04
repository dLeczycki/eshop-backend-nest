import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './entities/user-role.entity';
import { User } from './entities/user.entity';
import { Role } from './role.enum';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    throw new Error('Not implemented');
  }

  async findAll(includeRoles = false): Promise<[User[], number]> {
    const users = await User.findAndCount();

    if (includeRoles) {
      for await (const foundUser of users[0]) {
        foundUser.roles = await this.findUserRoles(foundUser);
      }
    }

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await User.findOne({ where: { id } });
    user.roles = await this.findUserRoles(user);

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    throw new Error('Not implemented');
  }

  remove(id: string) {
    throw new Error('Not implemented');
  }

  async findUserRoles(user: User): Promise<Role[]> {
    const userRoles = await UserRole.find({ where: { user } });
    return userRoles.map((userRole) => userRole.role);
  }
}
