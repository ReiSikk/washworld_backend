import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { MemberPaymentCardService } from './member-payment-card.service';
import { CreateMemberPaymentCardDto } from './dto/create-member-payment-card.dto';
import { UpdateMemberPaymentCardDto } from './dto/update-member-payment-card.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  
  @UseGuards(JwtAuthGuard)
  @Get('cards')
  findCardsByMember(@Request() req) {;
    return this.memberPaymentCardService.findCardsByMember(req.user.id);
  }

  
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateMemberPaymentCardDto: UpdateMemberPaymentCardDto,
  ) {
    return this.memberPaymentCardService.update(+id, updateMemberPaymentCardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.memberPaymentCardService.remove(id);
  }
}
