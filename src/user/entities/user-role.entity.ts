import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from '../role.enum';
import { User } from './user.entity';

@Entity()
export class UserRole extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => User, (entity) => entity.roles, {
    nullable: false,
  })
  user: User;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;
}
