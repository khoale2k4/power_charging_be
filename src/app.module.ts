import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TuyaController } from './controllers/tuya.controller';
import { TuyaService } from './services/tuya.service';
import { Station, Device, Package, User, Order } from './entities';
import { 
  StationService, 
  DeviceService, 
  PackageService, 
  UserService, 
  OrderService 
} from './services/database';
import { 
  StationController, 
  DeviceController, 
  PackageController, 
  UserController, 
  OrderController 
} from './controllers/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'power_charging',
      entities: [Station, Device, Package, User, Order],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
    }),
    TypeOrmModule.forFeature([Station, Device, Package, User, Order]),
  ],
  controllers: [
    AppController, 
    TuyaController,
    StationController,
    DeviceController,
    PackageController,
    UserController,
    OrderController,
  ],
  providers: [
    AppService, 
    TuyaService,
    StationService,
    DeviceService,
    PackageService,
    UserService,
    OrderService,
  ],
})
export class AppModule {}
