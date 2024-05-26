import { Test, TestingModule } from '@nestjs/testing';
import { WashStationService } from './wash-station.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WashStation } from './entities/wash-station.entity';

describe('WashStationService', () => {
  let service: WashStationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WashStationService,
        {
          provide: getRepositoryToken(WashStation),
          useClass: Repository
        }
      ],
    }).compile();

    service = module.get<WashStationService>(WashStationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
