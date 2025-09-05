import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { PackageService } from '../../services/database/package.service';
import { Package, PackageType } from '../../entities/package.entity';

@Controller('packages')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Post()
  async create(@Body() packageData: Partial<Package>): Promise<Package> {
    return await this.packageService.create(packageData);
  }

  @Get()
  async findAll(): Promise<Package[]> {
    return await this.packageService.findAll();
  }

  @Get('type/:type')
  async findByType(@Param('type') type: PackageType): Promise<Package[]> {
    return await this.packageService.findByType(type);
  }

  @Get('hourly')
  async findHourly(): Promise<Package[]> {
    return await this.packageService.findHourlyPackages();
  }

  @Get('kwh')
  async findKwh(): Promise<Package[]> {
    return await this.packageService.findKwhPackages();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Package | null> {
    return await this.packageService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() packageData: Partial<Package>,
  ): Promise<Package | null> {
    return await this.packageService.update(id, packageData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.packageService.remove(id);
  }
}
