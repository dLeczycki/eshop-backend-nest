import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../types';
import { UserRole } from './user-role.entity';

@Entity()
export class User extends BaseEntity implements UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    default: null,
  })
  tokenId: string | null;

  @OneToMany(() => UserRole, (entity) => entity.user, { eager: true })
  @JoinColumn({
    name: 'roles',
  })
  roles: UserRole[];
}
