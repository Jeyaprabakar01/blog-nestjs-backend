import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
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

  //Follow user
  async followProfile(
    username: string,
    followUsername: string,
  ): Promise<{ username: string; bio: string; image: string }> {
    const profile = await this.userModel.findOneAndUpdate(
      { username },
      {
        $addToSet: { followers: followUsername },
      },
      { new: true },
    );
    return {
      username: profile.username,
      bio: profile.bio,
      image: profile.image,
    };
  }

  //unfollow user
  async unfollowUser(
    username: string,
    followUsername: string,
  ): Promise<{ username: string; bio: string; image: string }> {
    const profile = await this.userModel.findOneAndUpdate(
      { username },
      {
        $pull: { followers: followUsername },
      },
      { new: true },
    );
    return {
      username: profile.username,
      bio: profile.bio,
      image: profile.image,
    };
  }
}
