import { Test, TestingModule } from '@nestjs/testing';
import { WashStationController } from './wash-station.controller';
import { WashStationService } from './wash-station.service';

describe('WashStationController', () => {
  let controller: WashStationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashStationController],
      providers: [WashStationService],
    }).compile();

    controller = module.get<WashStationController>(WashStationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
