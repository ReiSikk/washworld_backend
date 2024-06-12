import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentCardService } from './payment-card.service';
import { CreatePaymentCardDto } from './dto/create-payment-card.dto';
import { UpdatePaymentCardDto } from './dto/update-payment-card.dto';

@Controller('paymentcard')
export class PaymentCardController {
  constructor(private readonly paymentCardService: PaymentCardService) {}

  @Post()
  create(@Body() createPaymentCardDto: CreatePaymentCardDto) {
    return this.paymentCardService.create(createPaymentCardDto);
  }

  @Get()
  findAll() {
    return this.paymentCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentCardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentCardDto: UpdatePaymentCardDto) {
    return this.paymentCardService.update(+id, updatePaymentCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentCardService.remove(+id);
  }
}
