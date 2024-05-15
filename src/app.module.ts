import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../data-source';
import { ServiceModule } from './service/service.module';
import { MemberModule } from './member/member.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Directly use dataSource for TypeORM configuration
    TypeOrmModule.forRoot(dbConfig),
    SubscriptionsModule,
    ServiceModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
