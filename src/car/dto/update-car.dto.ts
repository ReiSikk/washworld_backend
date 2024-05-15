import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCarDto extends PartialType(CreateCarDto) {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    licensePlate?: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(55)
    country?: string;
}
