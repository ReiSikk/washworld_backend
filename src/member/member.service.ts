import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
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

type AddCarAndUpdateMemberResponse = { 
  success: boolean; 
  message: string 
};

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


async addCarAndUpdateMember(memberId: number, createCarDtos: CreateCarDto[], paymentMethodID: string): Promise<AddCarAndUpdateMemberResponse> {
  console.log('MemberId in addCarAndUpdateMember', memberId);
  console.log('createcarDtos in addCarAndUpdateMember', createCarDtos);
  console.log('paymentCardId in addCarAndUpdateMember', paymentMethodID);
  try {
    await this.memberRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const subscriptionPlan = await transactionalEntityManager.findOne(Subscription, { where: { id: createCarDtos[0].subscriptionPlanId }});
        if (!subscriptionPlan) {
          throw new Error('Subscription plan not found');
        }

        const member = await transactionalEntityManager.findOne(Member, { where: { id: memberId }});
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

        await transactionalEntityManager.save(cars);

        // Update member
        member.active = true;
        await transactionalEntityManager.save(member);

  
        const paymentCardIdNumber = parseInt(paymentMethodID);
        console.log('paymentCardIdNumber', paymentCardIdNumber);

        const paymentCard = await transactionalEntityManager.findOne(PaymentCard, { where: { id: paymentCardIdNumber } });
      if (!paymentCard) {
        throw new NotFoundException(`Payment card with ID ${paymentMethodID} not found`);
      }
        console.log('paymentCard in transaction', paymentCard);

        // Check if memberPaymentCard entry exists
        let memberPaymentCard = await transactionalEntityManager.findOne(MemberPaymentCard, { where: { member: { id: memberId }, paymentCard: { id: paymentCardIdNumber } } });
        if (!memberPaymentCard) {
          // Create a new entry if it doesn't exist
          memberPaymentCard = this.memberPaymentCardRepository.create({
            member,
            paymentCard,
            isActive: true,
            isDefaultMethod: false,
          });
        } else {
          // Update the existing entry if necessary
          memberPaymentCard.isActive = true;
          memberPaymentCard.isDefaultMethod = false;
        }

        await transactionalEntityManager.save(memberPaymentCard);
      }
    );

    // Return a success response
    return { success: true, message: 'Car added and member updated successfully' };
  } catch (error) {
    console.error('Error adding car and updating member:', error);
    return { success: false, message: 'Failed to add car and update member' };
  }
}


}
