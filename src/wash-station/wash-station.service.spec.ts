import { Test, TestingModule } from '@nestjs/testing';
import { WashStationService } from './wash-station.service';

describe('WashStationService', () => {
  let service: WashStationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WashStationService],
    }).compile();

    service = module.get<WashStationService>(WashStationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
