import { IsNotEmpty, IsString, IsNumber, MinLength, IsBoolean, IsDate } from 'class-validator';


export class CreateMemberDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
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
