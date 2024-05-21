import { Injectable, ConflictException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/car/entities/car.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { PaymentCard } from 'src/payment-card/entities/payment-card.entity';
import { CreateCarDto } from 'src/car/dto/create-car.dto';
import { MemberPaymentCard } from 'src/member-payment-card/entities/member-payment-card.entity';

@Injectable()
export class MemberService {

   //injecting the repository
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(PaymentCard)
    private paymentCardRepository: Repository<PaymentCard>,
    @InjectRepository(MemberPaymentCard)
    private memberPaymentCardRepository: Repository<MemberPaymentCard>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const existingUser = await this.memberRepository.findOne({ where: { email: createMemberDto.email } });

    if (existingUser) {
      throw new ConflictException('Username is already taken');
    }
  
    const member = new Member();
    member.email = createMemberDto.email;
    member.password = createMemberDto.password;
    member.firstName = createMemberDto.firstName;
    member.lastName = createMemberDto.lastName;
    member.phone = createMemberDto.phone;
    //member.role = Role.Member;

  /*   if(createMemberDto.email.endsWith('@finance.admin')){
      member.role = Role.Admin;
    }  */

    return this.memberRepository.save(member);
  }



  async findOne(email: string): Promise<Member | undefined> {
    return await this.memberRepository.findOne({ where: { email } });
 }
 async findUserById(id: number) : Promise<Member> {
   return this.memberRepository.findOne({where: {id: id}});
}

async findAll(): Promise<Member[]> {
 return this.memberRepository.find();
}

/* async upgrade(memberId: number) {
  const member = await this.findUserById(memberId); // find user by the userId
  member.role = Role.PremiumUser; // changing the role in memory
  return this.memberRepository.save(member); //saving the updated user obj. to the db
} */

async addCarAndUpdateMember(memberId: number, createCarDto: CreateCarDto): Promise<void> {
  const {
    licensePlate,
    country,
    subscriptionPlanId,
    paymentCardId,
  } = createCarDto;

  await this.memberRepository.manager.transaction(
    async (transactionalEntityManager) => {
      const subscriptionPlan = await transactionalEntityManager.findOne(Subscription, { where: { id: subscriptionPlanId }})

      if (!subscriptionPlan) {
        throw new Error('Subscription plan not found');
      }

      const member = await transactionalEntityManager.findOne(Member, { where: { id: memberId }})
      console.log(member, "member in addCarAndUpdateMember");

      if (!member) {
        throw new Error('Member not found');
      }

      const car = this.carRepository.create({
        licensePlate: createCarDto.licensePlate,
        country: createCarDto.country,
        subscription: subscriptionPlan
      });

      console.log(car, "car in addCarAndUpdateMember");


      await transactionalEntityManager.save(car);

      //update member
      member.active = true;
      await transactionalEntityManager.save(member);

       // Link the payment card to the member
       const paymentCard = await transactionalEntityManager.findOne(PaymentCard, { where: {id: paymentCardId} });
        if (!paymentCard) {
          throw new Error('Payment card not found');
        }
      console.log(paymentCard, "paymentCard in addCarAndUpdateMember");


        const memberPaymentCard = this.memberPaymentCardRepository.create({
          member,
          paymentCard,
          isActive: true,
          isDefaultMethod: true,
        });
      console.log(memberPaymentCard, "memberPaymentCard in addCarAndUpdateMember");


        await transactionalEntityManager.save(memberPaymentCard);
    },
    
  );
}

}
