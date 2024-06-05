import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { MemberPaymentCard } from './entities/member-payment-card.entity';
import { CreateMemberPaymentCardDto } from './dto/create-member-payment-card.dto';
import { UpdateMemberPaymentCardDto } from './dto/update-member-payment-card.dto';
import { Member } from '../member/entities/member.entity';

@Injectable()
export class MemberPaymentCardService {
  constructor(
    @InjectRepository(MemberPaymentCard)
    private memberPaymentCardRepository: Repository<MemberPaymentCard>,
  ) {}

  async create(createMemberPaymentCardDto: CreateMemberPaymentCardDto) {
    const memberPaymentCard = this.memberPaymentCardRepository.create(createMemberPaymentCardDto);
    return this.memberPaymentCardRepository.save(memberPaymentCard);
  }

  findAll() {
    return this.memberPaymentCardRepository.find();
  }

  async findCardsByMember(memberId: number) {
    const memberPaymentCards = await this.memberPaymentCardRepository.find({
      where: { member: { id: memberId } }
    });
    //const cardsToDisplay = memberPaymentCards.map(memberPaymentCard => memberPaymentCard.paymentCard);  
    const cardsToDisplay = memberPaymentCards.map(memberPaymentCard => ({
      ...memberPaymentCard.paymentCard,
      isDefault: memberPaymentCard.isDefaultMethod,
      isActive: memberPaymentCard.isActive,
    }));

    if (memberPaymentCards.length === 0) {
      throw new NotFoundException(`MemberPaymentCard for member ID ${memberId} not found`);
    }
    return cardsToDisplay;
  }

 /*  findAll(user: User) {
    console.log("User in entry service find all method", user)
    return this.entryRepository.find({
      where: { user: { id: user.id } }
    })
  } */

  async update(paymentCardId: number, updateMemberPaymentCardDto: UpdateMemberPaymentCardDto) {
    try {
      return await this.memberPaymentCardRepository.manager.transaction(async transactionalEntityManager => {
        const memberPaymentCard = await transactionalEntityManager.findOne(MemberPaymentCard, {
          where: { paymentCard: { id: paymentCardId } },
          relations: ['member', 'paymentCard']
        });
  
        if (!memberPaymentCard) {
          throw new NotFoundException('MemberPaymentCard not found');
        }
  
        memberPaymentCard.isDefaultMethod = !memberPaymentCard.isDefaultMethod;
        const updatedMemberPaymentCard = await transactionalEntityManager.save(memberPaymentCard);
  
        if (updatedMemberPaymentCard.isDefaultMethod) {
          const otherCards = await transactionalEntityManager.find(MemberPaymentCard, {
            where: { member: { id: memberPaymentCard.member.id }, id: Not(memberPaymentCard.id) }
          });
  
          for (const card of otherCards) {
            console.log(otherCards)
            card.isDefaultMethod = false;
            await transactionalEntityManager.save(card);
          }
        }
  
        return updatedMemberPaymentCard;
      });
    } catch (error) {
      throw error;
    }
  }
  
  

  async remove(paymentCardId: number) {
    try {
      const memberPaymentCard = await this.memberPaymentCardRepository.findOne({
        where: { paymentCard: { id: paymentCardId } },
        relations: ['member', 'paymentCard']
      });
  
      if (!memberPaymentCard) {
        throw new NotFoundException('MemberPaymentCard not found');
      }
  
      await this.memberPaymentCardRepository.remove(memberPaymentCard);
  
      return { success: true, message: 'MemberPaymentCard removed successfully' };
    } catch (error) {
      throw error;
    }
  }

}
