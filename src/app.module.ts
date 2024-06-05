import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../data.source';
import { ServiceModule } from './service/service.module';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';
import { PaymentCardModule } from './payment-card/payment-card.module';
import { CarModule } from './car/car.module';
import { WashStationModule } from './wash-station/wash-station.module';
import { WashbayModule } from './washbay/washbay.module';
import { MemberPaymentCardModule } from './member-payment-card/member-payment-card.module';
import { SupportTicketModule } from './support-ticket/support-ticket.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Directly use dataSource for TypeORM configuration
    TypeOrmModule.forRoot(dbConfig),
    SubscriptionsModule,
    ServiceModule,
    MemberModule,
    AuthModule,
    PaymentCardModule,
    CarModule,
    WashStationModule,
    WashbayModule,
    MemberPaymentCardModule,
    SupportTicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
