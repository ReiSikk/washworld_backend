
import { Role } from "../../auth/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Car } from "../../car/entities/car.entity";
import { MemberPaymentCard } from "../../member-payment-card/entities/member-payment-card.entity";


@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
     @Column()
    phone: string;
    
    @Column({ default: false })
    active: boolean;
    
     @Column({ default: () => 'CURRENT_TIMESTAMP' })
    joinDate: Date;
    
    @Column({ default: 0 })
    loyaltyPoints: number;

    @Column({
        type: 'enum',
        enum: Role,
        default: [Role.User],
    })
    role: Role;
  
    @OneToMany(() => Car, (car) => car.member)
    cars: Car[];
  
    @OneToMany(() => MemberPaymentCard, (mpc) => mpc.member)
    memberPaymentCards: MemberPaymentCard[];

}
