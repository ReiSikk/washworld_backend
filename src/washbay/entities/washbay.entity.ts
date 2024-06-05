import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { WashStation } from '../../wash-station/entities/wash-station.entity';


@Entity()
export class WashBay {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bayNr: string;

  @Column({ type: 'varchar', length: 55 })
  bayType: string;

  @Column({ type: 'varchar', length: 50 })
  dimensionWidth: string;

  @Column({ type: 'varchar', length: 50 })
  dimensionHeight: string;

  @Column()
  available: boolean;

 @ManyToOne(() => WashStation, washStation => washStation.washBays)
 @JoinColumn({ name: 'washStationId' }) 
 
 washStation: WashStation;

}
