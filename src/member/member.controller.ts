import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { CreateCarDto } from '../car/dto/create-car.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Post(':id/add-car')
  async addCarAndUpdateMember(  
    @Param('id') memberId: number,
    @Body() body: { createCarDtos: CreateCarDto[] },
    @Param('id') paymentCardId: string,
  ) {
    console.log("addcar called",body.createCarDtos);
    return this.memberService.addCarAndUpdateMember(memberId, body.createCarDtos, paymentCardId);
  }

  @Get()
  findAll() {
    return this.memberService.findAll();
  }


  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.memberService.findUserById(+id);
  }


 /*  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  } */
}
