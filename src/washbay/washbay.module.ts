import { Module } from '@nestjs/common';
import { WashBayService } from './washbay.service';
import { WashbayController } from './washbay.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashBay } from './entities/washbay.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WashBay])],
  controllers: [WashbayController],
  providers: [WashBayService],
})
export class WashbayModule {}
