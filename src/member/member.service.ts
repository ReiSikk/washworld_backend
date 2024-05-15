import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemberService {

   //injecting the repository
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  create(createMemberDto: CreateMemberDto) {
    return this.memberRepository.save(createMemberDto);
  }

  findAll() {
    return this.memberRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
