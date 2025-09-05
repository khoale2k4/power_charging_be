import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package, PackageType } from '../../entities/package.entity';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
  ) {}

  async create(packageData: Partial<Package>): Promise<Package> {
    const pkg = this.packageRepository.create(packageData);
    return await this.packageRepository.save(pkg);
  }

  async findAll(): Promise<Package[]> {
    return await this.packageRepository.find({
      relations: ['orders'],
    });
  }

  async findOne(id: number): Promise<Package | null> {
    return await this.packageRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
  }

  async findByType(type: PackageType): Promise<Package[]> {
    return await this.packageRepository.find({
      where: { type },
      relations: ['orders'],
    });
  }

  async update(id: number, packageData: Partial<Package>): Promise<Package | null> {
    await this.packageRepository.update(id, packageData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.packageRepository.delete(id);
  }

  async findHourlyPackages(): Promise<Package[]> {
    return await this.findByType(PackageType.HOUR);
  }

  async findKwhPackages(): Promise<Package[]> {
    return await this.findByType(PackageType.KWH);
  }
}
