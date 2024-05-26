import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsDate } from 'class-validator';


export class SignInDto {

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
     password: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsBoolean()
    active: boolean;

    @IsNotEmpty()
    @IsDate()
    joinDate: Date;

    @IsNotEmpty()
    @IsNumber()
    loyaltyPoints: number;
}