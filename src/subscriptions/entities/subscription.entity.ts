import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@Entity()
export class Subscription {
@PrimaryGeneratedColumn()
id: number;

@IsNotEmpty()
@Column()
name: string;


@IsNotEmpty()
@IsNumber()
@Column()
price_per_month_kr: number;

@IsNotEmpty()
@IsString()
@Column()
description: string;
}
