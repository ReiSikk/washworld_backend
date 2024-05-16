import { IsNotEmpty, IsNumber, IsString, Max, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";


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

/* @OneToMany(() => WashBay, washBay => washBay.washStation)
washBays: WashBay[]; */
}
