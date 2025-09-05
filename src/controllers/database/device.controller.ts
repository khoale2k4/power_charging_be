import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { DeviceService } from '../../services/database/device.service';
import { Device, DeviceStatus } from '../../entities/device.entity';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async create(@Body() deviceData: Partial<Device>): Promise<Device> {
    return await this.deviceService.create(deviceData);
  }

  @Get()
  async findAll(): Promise<Device[]> {
    return await this.deviceService.findAll();
  }

  @Get('available')
  async findAvailable(): Promise<Device[]> {
    return await this.deviceService.findAvailableDevices();
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: DeviceStatus): Promise<Device[]> {
    return await this.deviceService.findDevicesByStatus(status);
  }

  @Get('station/:stationId')
  async findByStation(@Param('stationId') stationId: number): Promise<Device[]> {
    return await this.deviceService.findByStation(stationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Device | null> {
    return await this.deviceService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() deviceData: Partial<Device>,
  ): Promise<Device | null> {
    return await this.deviceService.update(id, deviceData);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: DeviceStatus,
  ): Promise<Device | null> {
    return await this.deviceService.updateStatus(id, status);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.deviceService.remove(id);
  }
}
