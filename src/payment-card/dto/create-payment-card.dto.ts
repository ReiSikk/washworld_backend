


import { IsNotEmpty, IsString, IsDateString, Length, MaxLength, IsDate } from "class-validator";

export class CreatePaymentCardDto {

@IsString()
@IsNotEmpty()
@Length(1,255)
nameOnCard: string;

@IsString()
@IsNotEmpty()
@Length(16, 19)
cardNumber: string;

@IsDateString()
@IsNotEmpty()
expirationDate: Date;

@IsString()
@IsNotEmpty()
@Length(3, 4)
cvv: string;
}


