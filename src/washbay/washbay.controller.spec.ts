import { Test, TestingModule } from '@nestjs/testing';
import { WashbayController } from './washbay.controller';
import { WashbayService } from './washbay.service';

describe('WashbayController', () => {
  let controller: WashbayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashbayController],
      providers: [WashbayService],
    }).compile();

    controller = module.get<WashbayController>(WashbayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
