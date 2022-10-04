import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User as UserI } from '../../types';
import { Role } from '../role.enum';
import { UserRole } from './user-role.entity';

@Entity()
export class User extends BaseEntity implements UserI {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => UserRole, (entity) => entity.user)
  @JoinColumn()
  roles: Role[];
}
