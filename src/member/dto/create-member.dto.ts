import { IsNotEmpty, IsString, IsNumber, MinLength, IsBoolean, IsDate } from 'class-validator';


export class CreateMemberDto {
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

    
 
}
