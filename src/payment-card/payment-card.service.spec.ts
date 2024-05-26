import { Test, TestingModule } from '@nestjs/testing';
import { PaymentCardService } from './payment-card.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentCard } from './entities/payment-card.entity';

describe('PaymentCardService', () => {
  let service: PaymentCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentCardService,
        {
          provide: getRepositoryToken(PaymentCard),
          useClass: Repository
        },

      ],
    }).compile();

    service = module.get<PaymentCardService>(PaymentCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
