import { Test, TestingModule } from '@nestjs/testing';
import { ScrapesController } from './scrapes.controller';

describe('ScrapesController', () => {
  let controller: ScrapesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapesController]
    }).compile();

    controller = module.get<ScrapesController>(ScrapesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
