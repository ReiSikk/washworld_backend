import { IsNotEmpty, IsString } from "class-validator";

export class CreateSupportTicketDto {

@IsString()
description: string;

@IsString()
photo: string;
}