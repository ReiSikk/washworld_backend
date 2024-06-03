import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaymentCard } from '../src/payment-card/entities/payment-card.entity';
import { CreatePaymentCardDto } from '../src/payment-card/dto/create-payment-card.dto';

describe('CardController (e2e)', () => {
    let app: INestApplication;
    let cardRepository: Repository<PaymentCard>;
    let connection: DataSource;
    let createdCardId: number;
  
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      cardRepository = moduleFixture.get(getRepositoryToken(PaymentCard))
      
      connection = moduleFixture.get(DataSource)
      app = moduleFixture.createNestApplication();
      app.useGlobalPipes(new ValidationPipe());
      await app.init();
    });


       describe('Add card to db', () => {
        it('should create a new card entry in the db', async () => {

          const createdCard : CreatePaymentCardDto = {
            nameOnCard: 'Markus Ojasaar',
            cardNumber: '8451 5555 1234 7777',
            expirationDate: new Date(),
            cvv: '123',
        };
            
          const { body } = await request(app.getHttpServer())
                              .post('/paymentcard')
                              .send(createdCard)
                              .expect(201);

                              expect(body.id).toBeDefined();
                              expect(body.nameOnCard).toEqual(createdCard.nameOnCard);
                              expect(body.cardNumber).toEqual(createdCard.cardNumber);
                              expect(body.expirationDate).toEqual(createdCard.expirationDate.toISOString());
                              expect(body.cvv).toEqual(createdCard.cvv);
                              createdCardId = body.id;
                            
        })

      })
       describe('Trying to add duplicate card', () => {
        it('should not create a new card entry in the db', async () => {

          const createdCard : CreatePaymentCardDto = {
            nameOnCard: 'Markus Ojasaar',
            cardNumber: '8451 5555 1234 7777',
            expirationDate: new Date(),
            cvv: '123',
        };

            
          const { body } = await request(app.getHttpServer())
                              .post('/paymentcard')
                              .send(createdCard)
                              .expect(409);
                              
                              expect(body.message).toEqual('Card already added to the system');
                            
        })

        afterEach(async () => {
          if(createdCardId) {
              await cardRepository.delete(createdCardId);
          }
      })
      })



      afterAll(() => {
        app.close();
      });
    });
