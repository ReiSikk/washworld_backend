import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Car } from '../src/car/entities/car.entity';
import { CreateCarDto } from '../src/car/dto/create-car.dto';

describe('CarController (e2e)', () => {
  let app: INestApplication;
  let carRepository: Repository<Car>;
  let connection: DataSource;
  let createdCarId: number;
  let subscriptionPlanId: number;
  let memberId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    carRepository = moduleFixture.get(getRepositoryToken(Car));
    connection = moduleFixture.get(DataSource);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new car entry in the db', async () => {
    const createdCar: CreateCarDto = {
      licensePlate: 'EXAM123',
      country: 'Denmark',
      subscriptionPlanId: 1,
      memberId: 3,
    };

    const { body } = await request(app.getHttpServer())
      .post('/car')
      .send(createdCar)
      .expect(201);

    expect(body.licensePlate).toEqual(createdCar.licensePlate);
    expect(body.country).toEqual(createdCar.country);
    createdCarId = body.id;
  });

  describe('Trying to add duplicate car', () => {
    it('should not create a new car entry in the db', async () => {
      const createdCar: CreateCarDto = {
        licensePlate: 'EXAM123',
        country: 'Denmark',
        subscriptionPlanId: 1,
        memberId: 3,
      };

  
      const { body } = await request(app.getHttpServer())
        .post('/car')
        .send(createdCar)
        .expect(409);

      expect(body.message).toEqual('Car already added to the system');
    });

    
    afterEach(async () => {
      if (createdCarId) {
        await carRepository.delete(createdCarId);
      }
    });
  });
});
