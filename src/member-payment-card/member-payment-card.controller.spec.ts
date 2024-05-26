import { Test, TestingModule } from '@nestjs/testing';
import { MemberPaymentCardController } from './member-payment-card.controller';
import { MemberPaymentCardService } from './member-payment-card.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberPaymentCard } from './entities/member-payment-card.entity';

describe('MemberPaymentCardController', () => {
  let controller: MemberPaymentCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberPaymentCardController],
      providers: [
        MemberPaymentCardService,
        {
          provide: getRepositoryToken(MemberPaymentCard),
          useClass: Repository,
        },

      ],
    }).compile();

    controller = module.get<MemberPaymentCardController>(MemberPaymentCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
