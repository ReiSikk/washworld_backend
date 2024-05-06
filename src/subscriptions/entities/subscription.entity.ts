import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@Entity()
export class Subscription {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;


@Column()
price_per_month_kr: number;

@Column()
description: string;
}
