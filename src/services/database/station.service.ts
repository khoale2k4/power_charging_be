import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from '../../entities/station.entity';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
  ) {}

  async create(stationData: Partial<Station>): Promise<Station> {
    const station = this.stationRepository.create(stationData);
    return await this.stationRepository.save(station);
  }

  async findAll(): Promise<Station[]> {
    return await this.stationRepository.find({
      relations: ['devices'],
    });
  }

  async findOne(id: number): Promise<Station | null> {
    return await this.stationRepository.findOne({
      where: { id },
      relations: ['devices'],
    });
  }

  async update(id: number, stationData: Partial<Station>): Promise<Station | null> {
    await this.stationRepository.update(id, stationData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.stationRepository.delete(id);
  }

  async findByLocation(lat: number, lng: number, radius: number = 10): Promise<Station[]> {
    // Tìm các station trong bán kính radius km
    const query = `
      SELECT *, 
      (6371 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lng) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distance
      FROM Station 
      HAVING distance < ?
      ORDER BY distance
    `;
    
    return await this.stationRepository.query(query, [lat, lng, lat, radius]);
  }
}
