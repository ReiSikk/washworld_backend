import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SupportTicket {
@PrimaryGeneratedColumn()
id: number;

@Column()
description: string;

@Column()
photo: string;
}