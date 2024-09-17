import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UsersModule, 
    LikesModule, 
    DatabaseModule
  ],
})
export class AppModule {}
