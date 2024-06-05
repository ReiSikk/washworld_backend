import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupportTicketService } from './support-ticket.service';
import { CreateSupportTicketDto } from './dto/create-support-ticket.dto';
import { UpdateSupportTicketDto } from './dto/update-support-ticket.dto';

@Controller('support-ticket')
export class SupportTicketController {
  constructor(private readonly supportTicketService: SupportTicketService) {}

  @Post()
  async create(@Body() createSupportTicketDto: CreateSupportTicketDto) {
    const display_url = await this.supportTicketService.saveImage(createSupportTicketDto.photo);
    createSupportTicketDto.photo = display_url; //saving the image url to the database
    return this.supportTicketService.create(createSupportTicketDto);
  }

  @Get()
  findAll() {
    return this.supportTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportTicketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupportTicketDto: UpdateSupportTicketDto) {
    return this.supportTicketService.update(+id, updateSupportTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportTicketService.remove(+id);
  }
}
