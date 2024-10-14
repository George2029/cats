import {
  UsePipes,
  UseGuards,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/validation.pipe';
import { LikesService } from './likes.service';
import { AuthGuard } from 'src/auth.guard';
import { likeDto, LikeDto } from 'src/dto/likeDto';

@UseGuards(AuthGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  getLikes(@Body() { user_id }: { user_id: string }) {
    return this.likesService.getLikes(user_id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(likeDto))
  addLike(@Body() { cat_id, user_id, url }: LikeDto) {
    return this.likesService.addLike(user_id, cat_id, url);
  }

  @Delete(':cat_id')
  deleteLike(
    @Param('cat_id') cat_id: string,
    @Body('user_id') user_id: string,
  ) {
    return this.likesService.deleteLike(user_id, cat_id);
  }
}
