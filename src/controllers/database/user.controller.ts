import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UserService } from '../../services/database/user.service';
import { User } from '../../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userData: Partial<User>): Promise<User> {
    return await this.userService.create(userData);
  }

  @Post('register')
  async register(@Body() userData: { username: string; email?: string; password: string }): Promise<User> {
    return await this.userService.create({
      username: userData.username,
      email: userData.email,
      hashedPassword: userData.password,
    });
  }

  @Post('login')
  async login(@Body() loginData: { username: string; password: string }): Promise<{ user: User | null; valid: boolean }> {
    const user = await this.userService.findByUsername(loginData.username);
    if (!user) {
      return { user: null, valid: false };
    }
    
    const valid = await this.userService.validatePassword(loginData.password, user.hashedPassword);
    return { user: valid ? user : null, valid };
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('using-devices')
  async findUsersUsingDevices(): Promise<User[]> {
    return await this.userService.findUsersUsingDevice();
  }

  @Get('username/:username')
  async findByUsername(@Param('username') username: string): Promise<User | null> {
    return await this.userService.findByUsername(username);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return await this.userService.findByEmail(email);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | null> {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userData: Partial<User>,
  ): Promise<User | null> {
    return await this.userService.update(id, userData);
  }

  @Put(':id/using-device')
  async updateUsingDevice(
    @Param('id') id: number,
    @Body('deviceId') deviceId: number | null,
  ): Promise<User | null> {
    return await this.userService.updateUsingDevice(id, deviceId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.userService.remove(id);
  }
}
