import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { Car } from '../car/entities/car.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { PaymentCard } from '../payment-card/entities/payment-card.entity';
import { MemberPaymentCard } from '../member-payment-card/entities/member-payment-card.entity';

describe('MemberService', () => {
  let service: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(Member),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Car),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Subscription),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PaymentCard),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(MemberPaymentCard),
          useClass: Repository,
        },

      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
