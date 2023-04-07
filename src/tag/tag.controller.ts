import { Controller } from '@nestjs/common';
import { TagService } from './tag.service';
import { Get } from '@nestjs/common';

@Controller('api/tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  async getTags(): Promise<string[]> {
    const tags = await this.tagService.getAllTags();
    return tags;
  }
}
