import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
/* import { WashBay } from './washBay.entity'; */

@Entity()
export class WashStation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stationNr: string;

  @Column()
  stationName: string;

  @Column()
  address: string;

  @Column('time')
  openingTime: string;

  @Column('time')
  closingTime: string;

/*   @OneToMany(() => WashBay, (washBay) => washBay.washStation)
  washBays: WashBay[]; */
}

