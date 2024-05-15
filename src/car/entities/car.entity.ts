import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Subscription } from "../../subscriptions/entities/subscription.entity";

@Entity()
export class Car {
@PrimaryGeneratedColumn()
id: number;

@Column()
licensePlate: string;

@Column()
country: string;

//Many to one relationship with Member
/* @ManyToOne(() => Member, (member) => member.cars, { nullable: true })
@JoinColumn({ name: 'FK_MemberID' })
member: Member; */


/* @ManyToOne(() => Subscription,{
    eager: true
})
subscription: Subscription; */

}
