import { Module } from '@nestjs/common';
import { PaymentCardService } from './payment-card.service';
import { PaymentCardController } from './payment-card.controller';
import { PaymentCard } from './entities/payment-card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentCard])],
  controllers: [PaymentCardController],
  providers: [PaymentCardService],
})
export class PaymentCardModule {}
