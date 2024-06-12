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


  async saveImage(base64EncodedImage: string): Promise<string> {
    const formData = new FormData();
    formData.append('image', base64EncodedImage);

    try {
      const response = await fetch(`https://freeimage.host/api/1/upload?key=${process.env.IMG_API_KEY}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const imageData = await response.json();
      return imageData;
    } catch (error) {
      throw error;
    }
  }


  create(createSupportTicketDto: CreateSupportTicketDto) {
    const ticket = this.supportTicketRepository.create(createSupportTicketDto);
  ticket.photo = createSupportTicketDto.photo.image.display_url;
    return this.supportTicketRepository.save(ticket);
  }


  findAll() {
    return this.supportTicketRepository.find();
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
