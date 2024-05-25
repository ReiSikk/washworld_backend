import { Injectable, ConflictException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../auth/enums/role.enum';
import { Car } from '../car/entities/car.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { PaymentCard } from '../payment-card/entities/payment-card.entity';
import { CreateCarDto } from 'src/car/dto/create-car.dto';
import { MemberPaymentCard } from '../member-payment-card/entities/member-payment-card.entity';
import { CarService } from '../car/car.service'; // Import CarService here

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
    member.role = Role.User;

     if(createMemberDto.email.endsWith('@admin.com')){
      member.role = Role.Admin;
    }  

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

async addCarAndUpdateMember(memberId: number, createCarDtos: CreateCarDto[]): Promise<void> {

  await this.memberRepository.manager.transaction(
    async (transactionalEntityManager) => {
      const subscriptionPlan = await transactionalEntityManager.findOne(Subscription, { where: { id: createCarDtos[0].subscriptionPlanId }})

      if (!subscriptionPlan) {
        throw new Error('Subscription plan not found');
      }

      const member = await transactionalEntityManager.findOne(Member, { where: { id: memberId }})
      //console.log(member, "member in addCarAndUpdateMember");

      if (!member) {
        throw new Error('Member not found');
      }

      const cars = createCarDtos.map(createCarDto => {
        return this.carRepository.create({
          licensePlate: createCarDto.licensePlate,
          country: createCarDto.country,
          member: member,
          subscription: subscriptionPlan,
        });
      });
      //console.log(cars, "cars in addCarAndUpdateMember");


      await transactionalEntityManager.save(cars);

      //update member
      member.active = true;
      await transactionalEntityManager.save(member);

       // Link the payment card to the member
       const paymentCard = await transactionalEntityManager.findOne(PaymentCard, { where: {id: createCarDtos[0].paymentCardId} });
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
      //console.log(memberPaymentCard, "memberPaymentCard in addCarAndUpdateMember");


        await transactionalEntityManager.save(memberPaymentCard);
    },
    
  );
}

}
