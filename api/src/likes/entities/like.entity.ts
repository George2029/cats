import { Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Like {
  @PrimaryColumn({ type: 'varchar' })
  cat_id: string;

  @PrimaryColumn({ type: 'uuid' })
  user_id: string;

  @CreateDateColumn({ default: () => 'NOW()' })
  created_at: Date;
}
