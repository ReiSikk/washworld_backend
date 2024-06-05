import { IsNotEmpty, IsString, IsNumber } from 'class-validator';


export class CreateSubscriptionDto {

    @IsString()
    @IsNotEmpty()
     name: string;


     @IsNumber()
     @IsNotEmpty()
     price_per_month_kr: number;


    @IsString()
    @IsNotEmpty()
     description: string;

}
