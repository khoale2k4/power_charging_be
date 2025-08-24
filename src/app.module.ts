import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TuyaController } from './controllers/tuya.controller';
import { TuyaService } from './services/tuya.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, TuyaController],
  providers: [AppService, TuyaService],
})
export class AppModule {}
