import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  //Get Profile
  async findbyUsername(
    username: string,
  ): Promise<{ username: string; bio: string; image: string }> {
    const user = await this.userModel
      .findOne({ username })
      .select('username bio image');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { username: user.username, bio: user.bio, image: user.image };
  }
}
