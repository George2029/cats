import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Like } from 'src/likes/entities/like.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('identity', {
    type: 'integer',
    generatedIdentity: 'ALWAYS',
  })
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  login: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
