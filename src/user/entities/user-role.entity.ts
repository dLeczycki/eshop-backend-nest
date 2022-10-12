import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role.enum';
import { User } from './user.entity';

@Entity()
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (entity) => entity.roles, {
    nullable: false,
  })
  user: User;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  role: Role;
}
