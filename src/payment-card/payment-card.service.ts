import { Injectable, ConflictException } from '@nestjs/common';
import { CreatePaymentCardDto } from './dto/create-payment-card.dto';
import { UpdatePaymentCardDto } from './dto/update-payment-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentCard } from './entities/payment-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentCardService {
  constructor(
    @InjectRepository(PaymentCard)
    private paymentCardRepository: Repository<PaymentCard>,
  ) {}



  async create(createPaymentCardDto: CreatePaymentCardDto) {
    const existingCard = await this.paymentCardRepository.findOne({ where: { cardNumber: createPaymentCardDto.cardNumber } });

    if (existingCard) {
      throw new ConflictException('Card already added to the system');
    }

    const newCard = this.paymentCardRepository.create(createPaymentCardDto);
    return this.paymentCardRepository.save(newCard)
  }

  findAll() {
    return this.paymentCardRepository.find();
  }

  findOne(id: number) {
    return this.paymentCardRepository.findOneBy({id})
  }

  update(id: number, updatePaymentCardDto: UpdatePaymentCardDto) {
    return this.paymentCardRepository.update(id, updatePaymentCardDto)
  }

  remove(id: number) {
    return this.paymentCardRepository.delete(id)
  }
}
