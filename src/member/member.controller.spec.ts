import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { MemberPaymentCard } from '../member-payment-card/entities/member-payment-card.entity';
import { PaymentCard } from '../payment-card/entities/payment-card.entity';
import { Car } from '../car/entities/car.entity';


describe('MemberController', () => {
  let controller: MemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [MemberService,
        {
          provide: getRepositoryToken(Member),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(Subscription),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(MemberPaymentCard),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(PaymentCard),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(Car),
          useClass: Repository
        },
        
      ],
    }).compile();

    controller = module.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
