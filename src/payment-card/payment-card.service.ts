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
    console.log(createPaymentCardDto, "backend called with this data")
    return this.paymentCardRepository.save(createPaymentCardDto)
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
