import { IsNotEmpty, IsString, IsNumber } from 'class-validator';


export class CreateSubscriptionDto {
    @IsNotEmpty()
     id: number;

     @IsNotEmpty()
     @IsString()
     name: string;


     @IsNotEmpty()
     @IsNumber()
     price_per_month_kr: number;


     @IsNotEmpty()
     @IsString()
     description: string;


  /*    constructor(id: number, name: string, price_per_month_kr: number, description: string) {
            this.id = id;
            this.name = name;
            this.price_per_month_kr = price_per_month_kr;
            this.description = description;
     } */
}
