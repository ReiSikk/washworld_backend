import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MemberService } from '../member/member.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService
    ) {}

    async signIn(member:any, password): Promise<any> {
      const userFromDb = await this.memberService.findOne(member.email);
      const isPasswordCorrect = await bcrypt.compare(password, userFromDb.password);
      
      if (userFromDb && isPasswordCorrect) {
          const payload = { member: userFromDb.email, id: userFromDb.id, role: userFromDb.role};
          return {
            success: true,
            role: userFromDb.role,
            access_token: this.jwtService.sign(payload, {expiresIn: '900s'}),
          };
        } else {
          throw new UnauthorizedException({success: false, message: 'Invalid credentials' });
        }
      }

    async validateUser(email: string, password: string): Promise<any> {
      const member = await this.memberService.findOne(email);
  
      if (member && await bcrypt.compare(password, member.password)) {
        const { password, ...result } = member;
        //retun user without password
        return result;
      }
      return null;
    }

  async signUp(createMemberDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createMemberDto.password, salt);
    createMemberDto.password = hashedPassword;
    return this.memberService.create(createMemberDto);
  }

}
