import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/auth/enums/role.enum";

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
}
