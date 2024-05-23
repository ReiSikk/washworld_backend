import { Module } from '@nestjs/common';
import { MemberPaymentCardService } from './member-payment-card.service';
import { MemberPaymentCardController } from './member-payment-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberPaymentCard } from './entities/member-payment-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberPaymentCard])],
  controllers: [MemberPaymentCardController],
  providers: [MemberPaymentCardService],
})
export class MemberPaymentCardModule {}
