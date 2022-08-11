import { Controller, Post } from '@nestjs/common';

@Controller('scrapes')
export class ScrapesController {
  @Post()
  addScrapeRequest(): string {
    return 'add scrape request';
  }
}
