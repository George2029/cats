import { Controller, Post, Res, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { ZodValidationPipe } from 'src/validation.pipe';
import { AUTH_TOKEN_HEADER } from 'src/constants';
import { CreateUserDto, createUserSchema } from 'src/dto/createUserDto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async createUser(@Res() res: Response, @Body() {login, password}: CreateUserDto) {
    let {user, token} = await this.usersService.createUser(login, password);
    res.setHeader(AUTH_TOKEN_HEADER, token).send(user);
  }
}
