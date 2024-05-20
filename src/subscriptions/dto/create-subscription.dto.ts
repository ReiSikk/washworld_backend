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


  /*    constructor(id: number, name: string, price_per_month_kr: number, description: string) {
            this.id = id;
            this.name = name;
            this.price_per_month_kr = price_per_month_kr;
            this.description = description;
     } */
}
