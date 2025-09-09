import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TuyaService } from '../services/tuya.service';
import type {
  TuyaTimerRequest,
  TuyaDeleteTimersRequest,
  TuyaDeviceCommand,
} from '../interfaces/tuya.interface';

@Controller('tuya')
export class TuyaController {
  constructor(private readonly tuyaService: TuyaService) { }

  /**
   * Get access token
   */
  @Get('auth/token')
  async getAccessToken() {
    try {
      return await this.tuyaService.getAccessToken();
    } catch (error) {
      throw new HttpException(
        `Failed to get access token: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Get('auth/token1')
  async getAccessToken1() {
    try {
      return await this.tuyaService.getAccessToken1();
    } catch (error) {
      throw new HttpException(
        `Failed to get access token: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Refresh access token
   */
  @Get('auth/refresh')
  async refreshAccessToken() {
    try {
      return await this.tuyaService.refreshAccessToken();
    } catch (error) {
      throw new HttpException(
        `Failed to refresh access token: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get user assets
   */
  @Get('assets')
  async getUserAssets() {
    try {
      return await this.tuyaService.getUserAssets();
    } catch (error) {
      throw new HttpException(
        `Failed to get user assets: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get devices of an asset
   */
  @Get('assets/:assetId/devices')
  async getAssetDevices(@Param('assetId') assetId: string) {
    try {
      return await this.tuyaService.getAssetDevices(assetId);
    } catch (error) {
      throw new HttpException(
        `Failed to get asset devices: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Send device command
   */
  @Post('devices/:deviceId/command')
  async sendDeviceCommand(
    @Param('deviceId') deviceId: string,
    @Body() command: { code: string; value: any }
  ) {
    try {
      return await this.tuyaService.sendDeviceCommand(
        deviceId,
        command.code,
        command.value
      );
    } catch (error) {
      throw new HttpException(
        `Failed to send device command: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('switchOn/:deviceId')
  async setSwitchOn(
    @Param('deviceId') deviceId: string,
    @Body() command: { code: string; value: any }
  ) {
    try {
      return await this.tuyaService.sendDeviceCommand(
        deviceId,
        "switch",
        true
      );
    } catch (error) {
      throw new HttpException(
        `Failed to send device command: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // phone
  // {
  //     "commands": [
  //   {
  //   "code": "alarm_set_1",
  //     "value": "BQAAZAcAAAA="
  // },
  //     ]
  // }

  // bicycle
  // {
  //     "commands": [
  //         {
  //             "code": "alarm_set_1",
  //             "value": "BQAAZAcABdAAAA=="
  //         }
  //     ]
  // }

  // bike
  //   {
  //     "commands": [
  //         {
  //             "code": "alarm_set_1",
  //             "value": "BQAAZAcCEgAAAA=="
  //         }
  //     ]
  // }

  // car
  //   {
  //     "commands": [
  //         {
  //             "code": "alarm_set_1",
  //             "value": "BQAAZAcAB1MAAA=="
  //         }
  //     ]
  // }

  @Get('switchOff/:deviceId')
  async setSwitchOff(
    @Param('deviceId') deviceId: string,
    @Body() command: { code: string; value: any }
  ) {
    try {
      return await this.tuyaService.sendDeviceCommand(
        deviceId,
        "switch",
        false
      );
    } catch (error) {
      throw new HttpException(
        `Failed to send device command: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get device status
   */
  @Get('devices/:deviceId/status')
  async getDeviceStatus(
    @Param('deviceId') deviceId: string,
    @Query('command_code') commandCode: string
  ) {
    try {
      return await this.tuyaService.getDeviceStatus(deviceId, commandCode);
    } catch (error) {
      throw new HttpException(
        `Failed to get device status: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get device statistics
   */
  @Get('devices/:deviceId/statistics')
  async getDeviceStatistics(
    @Param('deviceId') deviceId: string,
    @Query('code') code: string,
    @Query('start_time') startTime: string,
    @Query('end_time') endTime: string,
    @Query('stat_type') statType: string = 'sum',
    @Query('time_type') timeType: string = 'hours'
  ) {
    try {
      return await this.tuyaService.getDeviceStatistics(
        deviceId,
        code,
        startTime,
        endTime,
        statType,
        timeType
      );
    } catch (error) {
      throw new HttpException(
        `Failed to get device statistics: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get device statistics total
   */
  @Get('devices/:deviceId/statistics/total')
  async getDeviceStatisticsTotal(
    @Param('deviceId') deviceId: string,
    @Query('code') code: string,
    @Query('stat_type') statType: string = 'sum'
  ) {
    try {
      return await this.tuyaService.getDeviceStatisticsTotal(
        deviceId,
        code,
        statType
      );
    } catch (error) {
      throw new HttpException(
        `Failed to get device statistics total: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Add timer
   */
  @Post('devices/:deviceId/timers')
  async addTimer(
    @Param('deviceId') deviceId: string,
    @Body() timerData: TuyaTimerRequest
  ) {
    try {
      return await this.tuyaService.addTimer(deviceId, timerData);
    } catch (error) {
      throw new HttpException(
        `Failed to add timer: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Search timers
   */
  @Get('devices/:deviceId/timers')
  async searchTimers(@Param('deviceId') deviceId: string) {
    try {
      return await this.tuyaService.searchTimers(deviceId);
    } catch (error) {
      throw new HttpException(
        `Failed to search timers: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Delete timers
   */
  @Delete('devices/:deviceId/timers')
  async deleteTimers(
    @Param('deviceId') deviceId: string,
    @Body() deleteData: TuyaDeleteTimersRequest
  ) {
    try {
      return await this.tuyaService.deleteTimers(deviceId, deleteData);
    } catch (error) {
      throw new HttpException(
        `Failed to delete timers: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get current tokens (for debugging)
   */
  @Get('auth/tokens')
  async getCurrentTokens() {
    return {
      accessToken: this.tuyaService.getCurrentAccessToken(),
      refreshToken: this.tuyaService.getCurrentRefreshToken(),
    };
  }
}
