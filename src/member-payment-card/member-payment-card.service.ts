import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const cardsToDisplay = memberPaymentCards.map(memberPaymentCard => memberPaymentCard.paymentCard);  

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

  update(id: number, updateMemberPaymentCardDto: UpdateMemberPaymentCardDto) {
    return this.memberPaymentCardRepository.update(id, updateMemberPaymentCardDto)
  }

  async remove(id: number) {
    await this.memberPaymentCardRepository.delete(id);
  }
}
