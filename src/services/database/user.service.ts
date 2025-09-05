import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    // Hash password nếu có
    if (userData.hashedPassword) {
      userData.hashedPassword = await bcrypt.hash(userData.hashedPassword, 10);
    }
    
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['usingDevice', 'orders'],
    });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['usingDevice', 'orders'],
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['usingDevice', 'orders'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['usingDevice', 'orders'],
    });
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    // Hash password nếu có
    if (userData.hashedPassword) {
      userData.hashedPassword = await bcrypt.hash(userData.hashedPassword, 10);
    }
    
    await this.userRepository.update(id, userData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async updateUsingDevice(userId: number, deviceId: number | null): Promise<User | null> {
    await this.userRepository.update(userId, { usingDeviceId: deviceId as any });
    return await this.findOne(userId);
  }

  async findUsersUsingDevice(): Promise<User[]> {
    return await this.userRepository.find({
      where: { usingDeviceId: Not(null) as any },
      relations: ['usingDevice'],
    });
  }
}
