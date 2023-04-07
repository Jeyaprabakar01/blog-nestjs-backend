import {
  Body,
  Post,
  Controller,
  Get,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('users')
  async singUp(@Body() signUpDto: SignUpDto): Promise<{
    token: string;
    username: string;
    email: string;
    bio: string;
    image: string;
  }> {
    return this.userService.signUp(signUpDto);
  }

  @Post('users/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.userService.login(loginDto);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  async getCurrentUser(@Req() req): Promise<UserDocument> {
    return this.userService.getUser(req.user);
  }

  @Put('user')
  @UseGuards(AuthGuard())
  async updateUser(
    @Req() req,
    @Body()
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const id = req.user.id;

    return this.userService.updateUser(id, updateUserDto);
  }
}
