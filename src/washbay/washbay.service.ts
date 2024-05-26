import { Inject, Injectable, Query } from '@nestjs/common';
import { CreateWashBayDto } from './dto/create-washbay.dto';
import { UpdateWashbayDto } from './dto/update-washbay.dto';
import { WashBay } from './entities/washbay.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WashStation } from '../wash-station/entities/wash-station.entity';


@Injectable()
export class WashBayService {

  constructor(
    @InjectRepository(WashBay)
    private washBayRepository: Repository<WashBay>,
    @InjectRepository(WashStation)
    private washStationRepository: Repository<WashStation>
  ) {}



  create(CreateWashBayDto: CreateWashBayDto) {
    return this.washBayRepository.save(CreateWashBayDto)
  }
  findAll() {
    return this.washBayRepository.find();
  }

  findOne(id: number) {
    return this.washBayRepository.findOneBy({id})
  }

  update(id: number, updateWashbayDto: UpdateWashbayDto) {
    return this.washBayRepository.update(id, updateWashbayDto)
  }

  remove(id: number) {
    return this.washBayRepository.delete(id)
  }
}
