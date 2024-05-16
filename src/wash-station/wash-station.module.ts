import { Module } from '@nestjs/common';
import { WashStationService } from './wash-station.service';
import { WashStationController } from './wash-station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashStation } from './entities/wash-station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WashStation])],
  controllers: [WashStationController],
  providers: [WashStationService],
})
export class WashStationModule {}
