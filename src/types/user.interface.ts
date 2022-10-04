import { Role } from '../user/role.enum';

export interface User {
  username: string;
  email: string;
  passwordHash: string;
  roles: Role[];
}
