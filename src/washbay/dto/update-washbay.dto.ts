import { PartialType } from '@nestjs/mapped-types';
import { CreateWashBayDto } from './create-washbay.dto';

export class UpdateWashbayDto extends PartialType(CreateWashBayDto) {}
