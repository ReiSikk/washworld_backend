import { Injectable, ConflictException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class MemberService {

   //injecting the repository
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const existingUser = await this.memberRepository.findOne({ where: { email: createMemberDto.email } });

    if (existingUser) {
      throw new ConflictException('Username is already taken');
    }
  


    const member = new Member();
    member.email = createMemberDto.email;
    member.password = createMemberDto.password;
    member.firstName = createMemberDto.firstName;
    member.lastName = createMemberDto.lastName;
    member.phone = createMemberDto.phone;
    member.role = Role.User;

     if(createMemberDto.email.endsWith('@admin.com')){
      member.role = Role.Admin;
    }  

    return this.memberRepository.save(member);
  }



  async findOne(email: string): Promise<Member | undefined> {
    return await this.memberRepository.findOne({ where: { email } });
 }
 async findUserById(id: number) : Promise<Member> {
   return this.memberRepository.findOne({where: {id: id}});
}

async findAll(): Promise<Member[]> {
 return this.memberRepository.find();
}

  
}
