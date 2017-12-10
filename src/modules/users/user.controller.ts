import { iUser } from './user.schema';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res, Response } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userS: UserService) {}

  @Post()
  async create(@Response() res, @Body() user: any) {
    const savedUser = await this.userS.new(user)
    res.status(200).json(savedUser);
  }

  @Get()
  async getAll(): Promise<iUser[]> {
    return this.userS.getAll();
  }

  @Post("login")
  async login(@Response() res, @Body() user: any) {
    (await this.userS.login(user)).subscribe(
      answer => {  res.json(answer)},
      err => { throw new HttpException(err, 500);}
    )
  }

}


