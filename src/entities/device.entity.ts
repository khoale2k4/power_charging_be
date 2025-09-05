import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Station } from './station.entity';
import { User } from './user.entity';
import { Order } from './order.entity';

export enum DeviceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE'
}

@Entity('Device')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stationId' })
  stationId: number;

  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.ACTIVE
  })
  status: DeviceStatus;

  @ManyToOne(() => Station, station => station.devices)
  @JoinColumn({ name: 'stationId' })
  station: Station;

  @OneToMany(() => Order, order => order.device)
  orders: Order[];

  @OneToOne(() => User, user => user.usingDevice)
  usingUser: User;
}
