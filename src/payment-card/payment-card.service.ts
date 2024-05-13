import { Injectable } from '@nestjs/common';
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



  create(createPaymentCardDto: CreatePaymentCardDto) {
    return this.paymentCardRepository.save(createPaymentCardDto)
  }

  findAll() {
    return `This action returns all paymentCard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentCard`;
  }

  update(id: number, updatePaymentCardDto: UpdatePaymentCardDto) {
    return `This action updates a #${id} paymentCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentCard`;
  }
}
