import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Car } from '../car/entities/car.entity';
import { MemberPaymentCard } from '../member-payment-card/entities/member-payment-card.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { PaymentCard } from '../payment-card/entities/payment-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Car, MemberPaymentCard, Subscription, PaymentCard ])],
  controllers: [MemberController],
  exports: [MemberService],
  providers: [MemberService],
})
export class MemberModule {}
