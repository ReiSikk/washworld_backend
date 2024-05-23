import { Test, TestingModule } from '@nestjs/testing';
import { MemberPaymentCardService } from './member-payment-card.service';

describe('MemberPaymentCardService', () => {
  let service: MemberPaymentCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberPaymentCardService],
    }).compile();

    service = module.get<MemberPaymentCardService>(MemberPaymentCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
