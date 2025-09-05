import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

export enum PackageType {
  HOUR = 'HOUR',
  KWH = 'KWH'
}

@Entity('Package')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: PackageType
  })
  type: PackageType;

  @OneToMany(() => Order, order => order.package)
  orders: Order[];
}
