import { UserRole } from '../user/entities/user-role.entity';
import { Role } from '../user/role.enum';

interface BasicUser {
  username: string;
  email: string;
  passwordHash: string;
}

export interface User extends BasicUser {
  roles: Role[];
}

export interface UserEntity extends BasicUser {
  roles: UserRole[];
}
