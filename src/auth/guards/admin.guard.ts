import { ExecutionContext, Injectable, CanActivate, Inject } from "@nestjs/common";
import { Member } from "src/member/entities/member.entity";
import { Role } from "../enums/role.enum";
import { MemberService } from "../../member/member.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@Inject(MemberService) private membersService: MemberService) {}
  async canActivate(context: ExecutionContext) : Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId: number = request.user.id
    const user = await this.membersService.findUserById(userId);
    
    return user && user.role === Role.Admin
  }
}