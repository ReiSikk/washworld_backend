import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from './car.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';

describe('CarService', () => {
  let service: CarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: getRepositoryToken(Car),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
