import { Test, TestingModule } from '@nestjs/testing';
import { PaymentCardController } from './payment-card.controller';
import { PaymentCardService } from './payment-card.service';
import { CreatePaymentCardDto } from './dto/create-payment-card.dto';

describe('PaymentCardController', () => {
  let controller: PaymentCardController;
  let service: PaymentCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentCardController],
      providers: [{
        provide: PaymentCardService,
        useValue: {
          create: jest.fn().mockResolvedValue({'nameOnCard': 'Rei Sikk', 'cardNumber': '1233 4585 8484 3381', 'expirationDate': '2027-04-30 23:59:59.999', 'cvv': '123'}),
          findAll: jest.fn().mockResolvedValue([
            {'nameOnCard': 'John Doe', 'cardNumber': '1233 4585 8484 3381', 'expirationDate': '12/23', 'cvv': '123'},
            {'nameOnCard': 'Jane Doe', 'cardNumber': '1233 4585 8484 3382', 'expirationDate': '12/24', 'cvv': '124'}
          ]),
        },
      }],
    }).compile();

    

    controller = module.get<PaymentCardController>(PaymentCardController);
    service = module.get<PaymentCardService>(PaymentCardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a payment card', async () => {
    const dto = {
      nameOnCard: 'Rei Sikk',
      cardNumber: '1233 9939 3939 3939',
      expirationDate: new Date('2027-04-30 23:59:59.999'),
      cvv: '123'
    };
    expect(await controller.create(dto)).toEqual({
      nameOnCard: 'Rei Sikk', 
      cardNumber: '1233 4585 8484 3381', 
      expirationDate: '2027-04-30 23:59:59.999', 
      cvv: '123'
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
