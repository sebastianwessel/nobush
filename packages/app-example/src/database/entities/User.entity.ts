import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'

import { UserStatus } from '../../service/User/types'
import { Uuid } from '../../types'

@Entity()
@Unique('unique_user_email', ['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: Uuid

  @Column({ nullable: false, default: UserStatus.Inactive })
  status: UserStatus

  @Column({ nullable: true, default: null })
  email: string

  @Column({ nullable: true, default: null })
  passwordHash: string

  @Column({ default: false })
  emailValid: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @BeforeInsert()
  initDefaultValues() {
    this.updatedAt = !this.updatedAt ? new Date() : this.updatedAt
  }
}
