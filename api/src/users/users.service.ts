import { Injectable } from '@nestjs/common';
import { createHmac, randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userEntity: Repository<User>
  ) {}

  async createUser(login: string, password: string) {
    const user = await this.userEntity.save({ login, password });
    console.log(`user created:`, user);

    const salt = randomBytes(32);
    const user_id_in_bytes = Buffer.from(user.id, 'utf-8');
    const user_id_length = Buffer.from([user_id_in_bytes.length]);

    const combined = Buffer.concat([salt, user_id_length, user_id_in_bytes]);

    const hmac = createHmac('sha256', Buffer.from(process.env.SECRET_KEY));
    hmac.update(combined);
    const hash = hmac.digest();

    const token = Buffer.concat([salt, user_id_length, user_id_in_bytes, hash]).toString('hex');

    return { token, user };
  }
}
