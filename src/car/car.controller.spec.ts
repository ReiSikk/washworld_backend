import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';

describe('CarController', () => {
  let controller: CarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController,],
      providers: [
        CarService,
        {
          provide: getRepositoryToken(Car),
          useClass: Repository,
        },

      ],
    }).compile();

    controller = module.get<CarController>(CarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
