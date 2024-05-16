import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateMemberDto } from 'src/member/dto/create-member.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() CreateMemberDto: CreateMemberDto) {
    return this.authService.signUp(CreateMemberDto);
}
  }



