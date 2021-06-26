import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('tags')
export class Tag {
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Expose({ name: 'custom_name' })
  custom_name(): string {
    return `#${this.name}`;
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
