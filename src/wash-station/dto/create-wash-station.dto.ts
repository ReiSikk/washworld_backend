import { IsNotEmpty, IsNumber, IsString, Max, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { WashBay } from "../../washbay/entities/washbay.entity";


@Entity()
export class CreateWashStationDto {

@IsString()
@IsNotEmpty()
stationNr: string;

@IsString()
@IsNotEmpty()
@MaxLength(255)
stationName: string;

@Column()
@IsString()
@IsNotEmpty()
@MaxLength(255)
address: string;

@Column('time')
@IsString()
@IsNotEmpty()
openingTime: string;

@Column('time')
@IsString()
@IsNotEmpty()
closingTime: string;

washBays: WashBay[];  

constructor(stationNr: string, stationName: string, address: string, openingTime: string, closingTime: string, washBays: WashBay[]) {
  this.stationNr = stationNr;
  this.stationName = stationName;
  this.address = address;
  this.openingTime = openingTime;
  this.closingTime = closingTime;
  this.washBays = washBays;
}
}
