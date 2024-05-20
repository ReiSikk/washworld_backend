import { PartialType } from '@nestjs/mapped-types';
import { CreateWashStationDto } from './create-wash-station.dto';

export class UpdateWashStationDto extends PartialType(CreateWashStationDto) {}
