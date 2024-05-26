import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MemberService } from '../member/member.service';
import { JwtService } from '@nestjs/jwt';
import { Member } from '../member/entities/member.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../car/entities/car.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { PaymentCard } from '../payment-card/entities/payment-card.entity';
import { MemberPaymentCard } from '../member-payment-card/entities/member-payment-card.entity';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        MemberService,
        JwtService,
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

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
