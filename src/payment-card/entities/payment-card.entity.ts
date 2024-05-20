import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsNumber, IsString, IsDate } from "class-validator";

@Entity()
export class PaymentCard {
@PrimaryGeneratedColumn()
id: number;

@Column()
nameOnCard: string;

@Column()
cardNumber: string;

@Column()
expirationDate: Date;

@Column()
cvv: string;
}
