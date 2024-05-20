import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
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
