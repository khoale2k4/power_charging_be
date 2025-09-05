import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device, DeviceStatus } from '../../entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async create(deviceData: Partial<Device>): Promise<Device> {
    const device = this.deviceRepository.create(deviceData);
    return await this.deviceRepository.save(device);
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceRepository.find({
      relations: ['station', 'orders', 'usingUser'],
    });
  }

  async findOne(id: number): Promise<Device | null> {
    return await this.deviceRepository.findOne({
      where: { id },
      relations: ['station', 'orders', 'usingUser'],
    });
  }

  async findByStation(stationId: number): Promise<Device[]> {
    return await this.deviceRepository.find({
      where: { stationId },
      relations: ['station', 'usingUser'],
    });
  }

  async update(id: number, deviceData: Partial<Device>): Promise<Device | null> {
    await this.deviceRepository.update(id, deviceData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.deviceRepository.delete(id);
  }

  async updateStatus(id: number, status: DeviceStatus): Promise<Device | null> {
    await this.deviceRepository.update(id, { status });
    return await this.findOne(id);
  }

  async findAvailableDevices(): Promise<Device[]> {
    return await this.deviceRepository.find({
      where: { 
        status: DeviceStatus.ACTIVE
      },
      relations: ['station'],
    });
  }

  async findDevicesByStatus(status: DeviceStatus): Promise<Device[]> {
    return await this.deviceRepository.find({
      where: { status },
      relations: ['station', 'usingUser'],
    });
  }
}
