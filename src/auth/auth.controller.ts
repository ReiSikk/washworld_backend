import { Controller, Get, Post, Body, Patch, Param, Delete, Request as Request2 } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateMemberDto } from 'src/member/dto/create-member.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MemberService } from '../member/member.service';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly memberService: MemberService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request2() req) {
    console.log("login method called")
    console.log("req.user", req.user);
    return this.authService.signIn(req.user, req.body.password);
  }

  @Post('signup')
  async signUp(@Body() CreateMemberDto: CreateMemberDto) {
    return this.authService.signUp(CreateMemberDto);
}

@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request2() req) {
  const memberID =  req.user.id;
  return memberID;
}

@UseGuards(JwtAuthGuard)
@Get('check-token')
checkToken() {
  return true;
}


/*  @UseGuards(JwtAuthGuard)
@Post('upgrade')
async upgrade(@Request2() req) {
    return this.authService.upgrade(req.user.id);
}  */
  }



