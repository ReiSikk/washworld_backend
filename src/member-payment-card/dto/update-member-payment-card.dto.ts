import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberPaymentCardDto } from './create-member-payment-card.dto';

export class UpdateMemberPaymentCardDto extends PartialType(CreateMemberPaymentCardDto) {
}
