import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':username')
  async findUserByUsername(
    @Param('username')
    username: string,
  ): Promise<{ username: string; bio: string; image: string }> {
    const user = await this.profileService.findbyUsername(username);
    return user;
  }

  @Post(':username/follow')
  async followProfile(
    @Param('username') username: string,
    @Req() user: { username: string },
  ) {
    const profile = await this.profileService.followProfile(
      username,
      user.username,
    );
    return {
      username: profile.username,
      bio: profile.bio,
      image: profile.image,
      following: true,
    };
  }

  @Delete(':username/follow')
  async unfollowProfile(
    @Param('username') username: string,
    @Req() user: { username: string },
  ) {
    const profile = await this.profileService.followProfile(
      username,
      user.username,
    );
    return {
      username: profile.username,
      bio: profile.bio,
      image: profile.image,
      following: false,
    };
  }
}
