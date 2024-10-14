import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/likes/entities/like.entity';
import { ERR_MESSAGES } from 'src/constants';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeEntity: Repository<Like>,
  ) {}

  async getLikes(user_id: string): Promise<Like[]> {
    let likes = await this.likeEntity.find({ where: { user_id } });
    console.log(`likes:`, likes);
    return likes;
  }

  async addLike(user_id: string, cat_id: string, url: string) {
    const new_like = { cat_id, user_id, url };
    const like = await this.likeEntity.save(new_like);
    return like;
  }

  async deleteLike(user_id: string, cat_id: string) {
    let { affected } = await this.likeEntity.delete({ user_id, cat_id });
    if (!affected) throw new NotFoundException(ERR_MESSAGES.like_not_found);
  }
}
