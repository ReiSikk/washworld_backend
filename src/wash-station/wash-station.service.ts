import { Injectable } from '@nestjs/common';
import { CreateWashStationDto } from './dto/create-wash-station.dto';
import { UpdateWashStationDto } from './dto/update-wash-station.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WashStation } from './entities/wash-station.entity';
import { Repository } from 'typeorm';
import { parse, format } from 'date-fns';

@Injectable()
export class WashStationService {
  constructor(
    @InjectRepository(WashStation)
    private washStationRepository: Repository<WashStation>,
  ) {}

  async isStationOpen(id: number): Promise<boolean> {
    const station = await this.washStationRepository.findOneBy({id});

    if (!station) {
      throw new Error('Station not found');
    }

    const now = new Date();
    const openingTime = parse(station.openingTime, 'HH:mm:ss', new Date());
    const closingTime = parse(station.closingTime, 'HH:mm:ss', new Date());

    return now >= openingTime && now <= closingTime;
  }


  create(createWashStationDto: CreateWashStationDto) {
    return this.washStationRepository.save(createWashStationDto)
  }

  async findWithWashBays(id: number): Promise<WashStation> {
    return this.washStationRepository.findOne({ where: { id: id }, relations: ['washBays'] });
}

  findAll() {
    return this.washStationRepository.find();
  }

  findOne(id: number) {
    return this.washStationRepository.findOneBy({id})
  }

  update(id: number, updateWashStationDto: UpdateWashStationDto) {
    return this.washStationRepository.update(id, updateWashStationDto)
  }

  remove(id: number) {
    return this.washStationRepository.delete(id)
  }
}
