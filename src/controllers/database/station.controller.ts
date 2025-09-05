import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { StationService } from '../../services/database/station.service';
import { Station } from '../../entities/station.entity';

@Controller('stations')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post()
  async create(@Body() stationData: Partial<Station>): Promise<Station> {
    return await this.stationService.create(stationData);
  }

  @Get()
  async findAll(): Promise<Station[]> {
    return await this.stationService.findAll();
  }

  @Get('nearby')
  async findNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius?: number,
  ): Promise<Station[]> {
    return await this.stationService.findByLocation(lat, lng, radius);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Station | null> {
    return await this.stationService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() stationData: Partial<Station>,
  ): Promise<Station | null> {
    return await this.stationService.update(id, stationData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.stationService.remove(id);
  }
}
