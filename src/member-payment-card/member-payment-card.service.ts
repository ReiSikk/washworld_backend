import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberPaymentCard } from './entities/member-payment-card.entity';
import { CreateMemberPaymentCardDto } from './dto/create-member-payment-card.dto';
import { UpdateMemberPaymentCardDto } from './dto/update-member-payment-card.dto';

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

  async findOne(id: number){
    const memberPaymentCard = await this.memberPaymentCardRepository.findOneBy({id});
    if (!memberPaymentCard) {
      throw new NotFoundException(`MemberPaymentCard with ID ${id} not found`);
    }
    return memberPaymentCard;
  }

  update(id: number, updateMemberPaymentCardDto: UpdateMemberPaymentCardDto) {
    return this.memberPaymentCardRepository.update(id, updateMemberPaymentCardDto)
  }

  async remove(id: number) {
    await this.memberPaymentCardRepository.delete(id);
  }
}
