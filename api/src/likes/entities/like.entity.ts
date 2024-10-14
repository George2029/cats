import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'likes' })
export class Like {
  @PrimaryColumn({ type: 'varchar' })
  cat_id: string;

  @PrimaryColumn({ type: 'integer' })
  user_id: string;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text' })
  url: string;

  @CreateDateColumn({ default: () => 'NOW()' })
  created_at: Date;
}
