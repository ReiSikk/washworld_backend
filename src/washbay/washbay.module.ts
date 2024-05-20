import { Module } from '@nestjs/common';
import { WashBayService } from './washbay.service';
import { WashbayController } from './washbay.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashBay } from './entities/washbay.entity';
import { WashStation } from '../wash-station/entities/wash-station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WashBay, WashStation])],
  controllers: [WashbayController],
  providers: [WashBayService],
})
export class WashbayModule {}
