import { IsNotEmpty, IsString } from "class-validator";

export class CreateSupportTicketDto {

@IsString()
description: string;

photo: any;

constructor(description: string, photo?: any) {
    this.description = description,
    this.photo = photo;
 }
}