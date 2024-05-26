import { Test, TestingModule } from '@nestjs/testing';
import { WashbayController } from './washbay.controller';
import { WashBayService } from './washbay.service';
import { WashBay } from './entities/washbay.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WashStation } from '../wash-station/entities/wash-station.entity';
import { Member } from '../member/entities/member.entity';
import { MemberService } from '../member/member.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { Car } from '../car/entities/car.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { PaymentCard } from '../payment-card/entities/payment-card.entity';
import { MemberPaymentCard } from '../member-payment-card/entities/member-payment-card.entity';

describe('WashbayController', () => {
  let controller: WashbayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashbayController],
      providers: [WashBayService,
        {
          provide: getRepositoryToken(WashBay),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(WashStation),
          useClass: Repository,
        },
        AdminGuard,
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

    controller = module.get<WashbayController>(WashbayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
