import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";
import { Member } from "src/member/entities/member.entity";
import { Role } from "../enums/role.enum";

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) : Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const member: Member = request.user;

    //this returns true if there is an user and the user has the role of admin
    return member && member.role === Role.Admin;
  }
}