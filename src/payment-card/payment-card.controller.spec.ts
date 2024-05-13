import { Test, TestingModule } from '@nestjs/testing';
import { PaymentCardController } from './payment-card.controller';
import { PaymentCardService } from './payment-card.service';

describe('PaymentCardController', () => {
  let controller: PaymentCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentCardController],
      providers: [PaymentCardService],
    }).compile();

    controller = module.get<PaymentCardController>(PaymentCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
