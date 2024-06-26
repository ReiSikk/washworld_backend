import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
    Unique
  } from 'typeorm';
  import { Member } from '../../member/entities/member.entity';
  import { PaymentCard } from '../../payment-card/entities/payment-card.entity';
  
  @Entity()
  @Unique(['member', 'paymentCard'])
  export class MemberPaymentCard {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Member, { eager: true })
    @JoinColumn({ name: 'memberId' })
    member: Member;
  
    @ManyToOne(() => PaymentCard, { eager: true })
    @JoinColumn({ name: 'paymentCardId' })
    paymentCard: PaymentCard;
  
    @Column({ default: true })
    isActive: boolean;
  
    @Column({name:'isDefaultMethod', default: false })
    isDefaultMethod: boolean;
  }
  