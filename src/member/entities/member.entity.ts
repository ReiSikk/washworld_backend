import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    
     @Column()
    joinDate: Date;
    
    @Column({ default: 0 })
    loyaltyPoints: number;
}
