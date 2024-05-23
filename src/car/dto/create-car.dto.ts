import {IsString,IsNotEmpty,MaxLength,IsNumber,} from 'class-validator';

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    licensePlate: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(55)
    country: string;

    @IsNumber()
    @IsNotEmpty()
    subscriptionPlanId: number;
  
    @IsNumber()
    @IsNotEmpty()
    paymentCardId: number;
  
}
