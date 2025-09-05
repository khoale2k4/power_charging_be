import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { OrderService } from '../../services/database/order.service';
import { Order, PaymentStatus } from '../../entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() orderData: Partial<Order>): Promise<Order> {
    return await this.orderService.create(orderData);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return await this.orderService.findAll();
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: number): Promise<Order[]> {
    return await this.orderService.findByUser(userId);
  }

  @Get('user/:userId/active')
  async findActiveByUser(@Param('userId') userId: number): Promise<Order[]> {
    return await this.orderService.findActiveOrdersByUser(userId);
  }

  @Get('device/:deviceId')
  async findByDevice(@Param('deviceId') deviceId: number): Promise<Order[]> {
    return await this.orderService.findByDevice(deviceId);
  }

  @Get('device/:deviceId/active')
  async findActiveByDevice(@Param('deviceId') deviceId: number): Promise<Order[]> {
    return await this.orderService.findActiveOrdersByDevice(deviceId);
  }

  @Get('payment-status/:status')
  async findByPaymentStatus(@Param('status') status: PaymentStatus): Promise<Order[]> {
    return await this.orderService.findByPaymentStatus(status);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order | null> {
    return await this.orderService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() orderData: Partial<Order>,
  ): Promise<Order | null> {
    return await this.orderService.update(id, orderData);
  }

  @Put(':id/payment-status')
  async updatePaymentStatus(
    @Param('id') id: number,
    @Body('status') status: PaymentStatus,
  ): Promise<Order | null> {
    return await this.orderService.updatePaymentStatus(id, status);
  }

  @Put(':id/amount-left')
  async updateAmountLeft(
    @Param('id') id: number,
    @Body('amountLeft') amountLeft: number,
  ): Promise<Order | null> {
    return await this.orderService.updateAmountLeft(id, amountLeft);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.orderService.remove(id);
  }
}
