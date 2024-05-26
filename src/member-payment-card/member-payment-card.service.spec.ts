import { Test, TestingModule } from '@nestjs/testing';
import { MemberPaymentCardService } from './member-payment-card.service';
import { MemberPaymentCard } from './entities/member-payment-card.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('MemberPaymentCardService', () => {
  let service: MemberPaymentCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberPaymentCardService,
        {
          provide: getRepositoryToken(MemberPaymentCard),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MemberPaymentCardService>(MemberPaymentCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
