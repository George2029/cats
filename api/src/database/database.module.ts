import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ["dist/*/entities/*.entity.js"],  
      synchronize: false,  
    })
  ],
})
export class DatabaseModule {}
