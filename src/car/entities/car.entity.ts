import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Subscription } from "../../subscriptions/entities/subscription.entity";
import { Member } from "../../member/entities/member.entity";


@Entity()
export class Car {
@PrimaryGeneratedColumn()
id: number;

@Column()
licensePlate: string;

@Column()
country: string;

@ManyToOne(() => Member, (member) => member.cars, { nullable: true })
member: Member;


@ManyToOne(() => Subscription,{
    eager: true
})
subscription: Subscription;

}
