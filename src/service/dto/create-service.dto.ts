import { IsNotEmpty, IsString } from 'class-validator';


export class CreateServiceDto {
    @IsNotEmpty()
     id: number;

     @IsNotEmpty()
     @IsString()
     name: string;
}
