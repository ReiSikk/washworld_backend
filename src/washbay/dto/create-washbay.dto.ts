import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, MaxLength } from "class-validator";
import { WashStation } from "../../wash-station/entities/wash-station.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity()
export class CreateWashBayDto {

@IsString()
@IsNotEmpty()
bayNr: string;

@IsString()
@IsNotEmpty()
@MaxLength(55)
bayType: string;

@Column()
@IsString()
@IsNotEmpty()
@MaxLength(50)
dimensionWidth: string;

@Column()
@IsString()
@IsNotEmpty()
@MaxLength(50)
dimensionHeight: string;

@Column()
@IsBoolean()
@IsNotEmpty()
available: boolean;

washStation: WashStation;

constructor(bayNr: string, type: string, dimensionWidth: string, dimensionHeight: string, available: true, washStation: WashStation) {
    this.bayNr = bayNr;
    this.bayType = type;
    this.dimensionWidth = dimensionWidth;
    this.dimensionHeight = dimensionHeight;
    this.available = available;
    this.washStation = washStation;
}
}
