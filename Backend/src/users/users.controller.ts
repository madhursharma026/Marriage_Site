import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Post, Body, Param, Get, UseInterceptors, UploadedFile } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('signup')
  @UseInterceptors(FileInterceptor('profileImage'))
  async signup(@Body('email') email: string, @Body('password') password: string, @Body('name') name: string, @UploadedFile() profileImage: Express.Multer.File) {
    return this.usersService.signup(email, password, name, profileImage.filename);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.usersService.login(email, password);
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Get()
  async getAllUsers() {
    return await this.usersService.getUsers();
  }
}
