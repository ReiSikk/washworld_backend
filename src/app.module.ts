import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../data-source';
import { ServiceModule } from './service/service.module';
import { PaymentCardModule } from './payment-card/payment-card.module';
import { CarModule } from './car/car.module';
import { WashStationModule } from './wash-station/wash-station.module';
import { WashbayModule } from './washbay/washbay.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Directly use dataSource for TypeORM configuration
    TypeOrmModule.forRoot(dbConfig),
    SubscriptionsModule,
    ServiceModule,
    PaymentCardModule,
    CarModule,
    WashStationModule,
    WashbayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
