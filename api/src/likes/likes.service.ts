import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/likes/entities/like.entity';
import { ERR_MESSAGES } from 'src/constants';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeEntity: Repository<Like>
  ) {}

  getLikes() {
    return this.likeEntity.find();
  }

  async addLike(user_id: string, cat_id: string) {
    const new_like = { cat_id, user_id};
    const like = await this.likeEntity.save(new_like);
    return like;
  }

  async deleteLike(user_id: string, cat_id: string) {
      let {affected} = await this.likeEntity.delete({user_id, cat_id})
      if (!affected) throw new NotFoundException(ERR_MESSAGES.like_not_found);
  }
}
