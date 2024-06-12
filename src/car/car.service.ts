import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';


@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}




  async create(createCarDto: CreateCarDto) {
    const existingCar = await this.carRepository.findOne({ where: { licensePlate: createCarDto.licensePlate } });

    if (existingCar) {
      throw new ConflictException('Car already added to the system');
    }

    const newCar = this.carRepository.create(createCarDto);
    return this.carRepository.save(newCar)
  }

  findAll() {
    return this.carRepository.find();
  }

  findOne(id: number) {
    return this.carRepository.findOneBy({id})
  }

  async findCarsByMember(memberId: number): Promise<Car[]> {
    try {
      const memberCars = await this.carRepository.find({
        where: { member: { id: memberId } }, 
        relations: ['subscription'], 
      });
      return memberCars;
    } catch (error) {
      console.error('Error fetching member cars:', error);
      throw new InternalServerErrorException('Failed to fetch member cars');
    }
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.carRepository.update(id, updateCarDto)
  }

  remove(id: number) {
    return this.carRepository.delete(id)
  }
}
