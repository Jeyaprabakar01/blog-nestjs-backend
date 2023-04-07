import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

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
}
