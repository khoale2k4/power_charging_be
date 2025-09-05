import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Device } from './device.entity';
import { Order } from './order.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  hashedPassword: string;

  @Column({ name: 'usingDeviceId', nullable: true })
  usingDeviceId: number;

  @OneToOne(() => Device, device => device.usingUser)
  @JoinColumn({ name: 'usingDeviceId' })
  usingDevice: Device;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
