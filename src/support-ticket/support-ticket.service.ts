import { Injectable } from '@nestjs/common';
import { CreateSupportTicketDto } from './dto/create-support-ticket.dto';
import { UpdateSupportTicketDto } from './dto/update-support-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupportTicket } from './entities/support-ticket.entity';



@Injectable()
export class SupportTicketService {
  constructor(
    @InjectRepository(SupportTicket)
    private supportTicketRepository: Repository<SupportTicket>,
  ) { }



  create(CreateSupportTicketDto: CreateSupportTicketDto) {
    return this.supportTicketRepository.save(CreateSupportTicketDto);
  }


  findAll() {
    return `This action returns all supportTicket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supportTicket`;
  }

  update(id: number, updateSupportTicketDto: UpdateSupportTicketDto) {
    return `This action updates a #${id} supportTicket`;
  }

  remove(id: number) {
    return `This action removes a #${id} supportTicket`;
  }
}
