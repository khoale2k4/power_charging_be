import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Order, PaymentStatus } from '../../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = this.orderRepository.create(orderData);
    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['user', 'device', 'package'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Order | null> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'device', 'package'],
    });
  }

  async findByUser(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { userId },
      relations: ['user', 'device', 'package'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByDevice(deviceId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { deviceId },
      relations: ['user', 'device', 'package'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByPaymentStatus(status: PaymentStatus): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { paymentStatus: status },
      relations: ['user', 'device', 'package'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, orderData: Partial<Order>): Promise<Order | null> {
    await this.orderRepository.update(id, orderData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async updatePaymentStatus(id: number, status: PaymentStatus): Promise<Order | null> {
    await this.orderRepository.update(id, { paymentStatus: status });
    return await this.findOne(id);
  }

  async updateAmountLeft(id: number, amountLeft: number): Promise<Order | null> {
    await this.orderRepository.update(id, { amountLeft });
    return await this.findOne(id);
  }

  async findActiveOrdersByUser(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { 
        userId,
        paymentStatus: PaymentStatus.PAID,
        amountLeft: MoreThan(0)
      },
      relations: ['user', 'device', 'package'],
      order: { createdAt: 'DESC' },
    });
  }

  async findActiveOrdersByDevice(deviceId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { 
        deviceId,
        paymentStatus: PaymentStatus.PAID,
        amountLeft: MoreThan(0)
      },
      relations: ['user', 'device', 'package'],
      order: { createdAt: 'DESC' },
    });
  }
}
