import { Test, TestingModule } from '@nestjs/testing';
import { WashStationController } from './wash-station.controller';
import { WashStationService } from './wash-station.service';
import { WashStation } from './entities/wash-station.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('WashStationController', () => {
  let controller: WashStationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashStationController],
      providers: [
        WashStationService,
        {
          provide: getRepositoryToken(WashStation),
          useClass: Repository,
        },

      ],
    }).compile();

    controller = module.get<WashStationController>(WashStationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
