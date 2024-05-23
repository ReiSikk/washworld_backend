import { IsInt, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateMemberPaymentCardDto {
  @IsNumber()
  memberId: number;

  @IsNumber()
  paymentCardId: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isDefaultMethod?: boolean;
}
