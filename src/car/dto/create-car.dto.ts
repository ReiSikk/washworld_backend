import {IsString,IsNotEmpty,MaxLength,} from 'class-validator';

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    licensePlate: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(55)
    country: string;


    //Many to one relationship with Member
    //member: Member;
    //Many to one relationship with subscriptionPlan
    //subscription: Subscription;
  
}
