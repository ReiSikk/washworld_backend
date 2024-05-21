import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MemberPaymentCardService } from './member-payment-card.service';
import { CreateMemberPaymentCardDto } from './dto/create-member-payment-card.dto';
import { UpdateMemberPaymentCardDto } from './dto/update-member-payment-card.dto';

@Controller('member-payment-cards')
export class MemberPaymentCardController {
  constructor(private readonly memberPaymentCardService: MemberPaymentCardService) {}

  @Post()
  create(@Body() createMemberPaymentCardDto: CreateMemberPaymentCardDto) {
    return this.memberPaymentCardService.create(createMemberPaymentCardDto);
  }

  @Get()
  findAll() {
    return this.memberPaymentCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberPaymentCardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemberPaymentCardDto: UpdateMemberPaymentCardDto,
  ) {
    return this.memberPaymentCardService.update(id, updateMemberPaymentCardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.memberPaymentCardService.remove(id);
  }
}
