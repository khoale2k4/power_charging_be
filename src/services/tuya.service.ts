import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { TuyaSignatureUtil } from '../utils/tuya-signature.util';
import {
  TuyaBaseResponse,
  TuyaTokenResponse,
  TuyaAssetsResponse,
  TuyaDevicesResponse,
  TuyaDeviceStatusResponse,
  TuyaStatisticsResponse,
  TuyaTimersResponse,
  TuyaTimerRequest,
  TuyaDeleteTimersRequest,
  TuyaDeviceCommand,
  TuyaConfig,
} from '../interfaces/tuya.interface';

@Injectable()
export class TuyaService {
  private readonly httpClient: AxiosInstance;
  private accessToken: string = '';
  private refreshToken: string = '';

  constructor(private configService: ConfigService) {
    this.httpClient = axios.create({
      baseURL: this.configService.get<string>('TUYA_BASE_URL'),
      timeout: 30000,
    });

    // Add response interceptor for error handling
    this.httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired, try to refresh
          return this.refreshAccessToken().then(() => {
            // Retry the original request
            const config = error.config;
            return this.httpClient.request(config);
          });
        }
        throw error;
      }
    );
  }

  /**
   * Get Tuya configuration from environment variables
   */
  private getTuyaConfig(): TuyaConfig {
    const baseUrl = this.configService.get<string>('TUYA_BASE_URL');
    const clientId = this.configService.get<string>('TUYA_CLIENT_ID');
    const secret = this.configService.get<string>('TUYA_SECRET');
    const userId = this.configService.get<string>('TUYA_USER_ID');
    const code = this.configService.get<string>('TUYA_CODE');

    if (!baseUrl || !clientId || !secret || !userId || !code) {
      throw new Error('Missing required Tuya configuration. Please check your .env file.');
    }

    return {
      baseUrl,
      clientId,
      secret,
      userId,
      code
    };
  }

  /**
   * Generate headers for Tuya API requests
   */
  private generateHeaders(
    method: string,
    path: string,
    body: string | null,
    accessToken: string = ''
  ): Record<string, string> {
    const config = this.getTuyaConfig();
    const timestamp = TuyaSignatureUtil.getTimestamp();
    const signature = TuyaSignatureUtil.generateSignature(
      config.clientId,
      config.secret,
      accessToken,
      timestamp,
      method,
      body,
      path
    );

    const headers: Record<string, string> = {
      'client_id': config.clientId,
      't': timestamp,
      'sign': signature,
      'sign_method': 'HMAC-SHA256',
      // 'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers['access_token'] = accessToken;
    }

    return headers;
  }

  /**
   * Get access token with simple mode
   */
  async getAccessToken(): Promise<TuyaTokenResponse> {
    const config = this.getTuyaConfig();
    const code = config.code;
    const path = '/v1.0/authorize_token';
    const queryParams = {
      code,
      grant_type: '3',
    };
    const sortedPath = TuyaSignatureUtil.buildSortedUrl(path, queryParams);

    const headers = this.generateHeaders('GET', sortedPath, null);

    try {
      const response = await this.httpClient.get<TuyaTokenResponse>(sortedPath, { headers });
      
      if (response.data.success) {
        this.accessToken = response.data.result.access_token;
        this.refreshToken = response.data.result.refresh_token;
      }

      return response.data;
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
  async refreshAccessToken(): Promise<TuyaTokenResponse> {
    if (!this.refreshToken) {
      throw new HttpException('No refresh token available', HttpStatus.BAD_REQUEST);
    }

    const config = this.getTuyaConfig();
    const path = `/v1.0/token/${this.refreshToken}`;
    const timestamp = TuyaSignatureUtil.getTimestamp();
    
    // For refresh token, use different signature calculation
    const str = config.clientId + timestamp;
    const hash = require('crypto').createHmac('sha256', config.secret);
    hash.update(str);
    const signature = hash.digest().toString('base64').toUpperCase();

    const headers = {
      'client_id': config.clientId,
      'sign': signature,
      't': timestamp,
      'sign_method': 'HMAC-SHA256',
    };

    try {
      const response = await this.httpClient.get<TuyaTokenResponse>(path, { headers });
      
      if (response.data.success) {
        this.accessToken = response.data.result.access_token;
        this.refreshToken = response.data.result.refresh_token;
      }

      return response.data;
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
  async getUserAssets(): Promise<TuyaAssetsResponse> {
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    const config = this.getTuyaConfig();
    const path = '/v1.0/cloud/energy/micro/assets';
    const queryParams = {
      user_id: config.userId,
    };
    const sortedPath = TuyaSignatureUtil.buildSortedUrl(path, queryParams);

    const headers = this.generateHeaders('GET', sortedPath, '', this.accessToken);

    try {
      const response = await this.httpClient.get<TuyaAssetsResponse>(sortedPath, { headers });
      return response.data;
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
  async getAssetDevices(assetId: string): Promise<TuyaDevicesResponse> {
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    const config = this.getTuyaConfig();
    const path = `/v1.0/cloud/energy/micro/assets/${assetId}/devices`;
    const queryParams = {
      user_id: config.userId,
    };
    const sortedPath = TuyaSignatureUtil.buildSortedUrl(path, queryParams);

    const headers = this.generateHeaders('GET', sortedPath, '', this.accessToken);

    try {
      const response = await this.httpClient.get<TuyaDevicesResponse>(sortedPath, { headers });
      return response.data;
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
  async sendDeviceCommand(
    deviceId: string,
    code: string,
    value: any
  ): Promise<TuyaBaseResponse> {
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    const config = this.getTuyaConfig();
    const path = `/v1.0/cloud/energy/micro/device/command/${deviceId}`;
    const queryParams = {
      code,
      user_id: config.userId,
      value: value.toString(),
    };
    const sortedPath = TuyaSignatureUtil.buildSortedUrl(path, queryParams);

    const headers = this.generateHeaders('POST', sortedPath, null, this.accessToken);

    try {
      const response = await this.httpClient.post<TuyaBaseResponse>(sortedPath, null, { headers });
      console.log(headers);
      return response.data;
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
  async getDeviceStatus(deviceId: string, commandCode: string): Promise<TuyaDeviceStatusResponse> {
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    const config = this.getTuyaConfig();
    const path = `/v1.0/cloud/energy/micro/device/command/${deviceId}`;
    const queryParams = {
      user_id: config.userId,
      command_code: commandCode,
    };
    const sortedPath = TuyaSignatureUtil.buildSortedUrl(path, queryParams);

    const headers = this.generateHeaders('GET', sortedPath, '', this.accessToken);

    try {
      const response = await this.httpClient.get<TuyaDeviceStatusResponse>(sortedPath, { headers });
      return response.data;
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
  async getDeviceStatistics(
    deviceId: string,
    code: string,
    startTime: string,
    endTime: string,
    statType: string = 'sum',
    timeType: string = 'hours'
  ): Promise<TuyaStatisticsResponse> {
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    const config = this.getTuyaConfig();
    const path = `/v1.0/cloud/energy/breaker/devices/${deviceId}/statistics`;
    const queryParams = {
      user_id: config.userId,
      code,
      start_time: startTime,
      end_time: endTime,
      stat_type: statType,
      time_type: timeType,
    };
    const sortedPath = TuyaSignatureUtil.buildSortedUrl(path, queryParams);

    const headers = this.generateHeaders('GET', sortedPath, '', this.accessToken);

    try {
      const response = await this.httpClient.get<TuyaStatisticsResponse>(sortedPath, { headers });
      return response.data;
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
  async getDeviceStatisticsTotal(
    deviceId: string,
    code: string,
    statType: string = 'sum'
  ): Promise<TuyaStatisticsResponse> {
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    const config = this.getTuyaConfig();
    const path = `/v1.0/cloud/energy/breaker/devices/${deviceId}/statistics/total`;
    const queryParams = {
      user_id: config.userId,
      code,
      stat_type: statType,
    };
    const sortedPath = TuyaSignatureUtil.buildSortedUrl(path, queryParams);

    const headers = this.generateHeaders('GET', sortedPath, '', this.accessToken);

    try {
      const response = await this.httpClient.get<TuyaStatisticsResponse>(sortedPath, { headers });
      return response.data;
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
  async addTimer(deviceId: string, timerData: TuyaTimerRequest): Promise<TuyaBaseResponse> {
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    const config = this.getTuyaConfig();
    const path = `/v1.0/cloud/energy/breaker/timer/device/${deviceId}`;
    const body = JSON.stringify(timerData);

    const headers = this.generateHeaders('POST', path, body, this.accessToken);

    try {
      const response = await this.httpClient.post<TuyaBaseResponse>(path, timerData, { headers });
      return response.data;
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
  async searchTimers(deviceId: string): Promise<TuyaTimersResponse> {
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    const config = this.getTuyaConfig();
    const path = `/v1.0/cloud/energy/breaker/timer/device/${deviceId}`;
    const queryParams = {
      user_id: config.userId,
    };
    const sortedPath = TuyaSignatureUtil.buildSortedUrl(path, queryParams);

    const headers = this.generateHeaders('GET', sortedPath, '', this.accessToken);

    try {
      const response = await this.httpClient.get<TuyaTimersResponse>(sortedPath, { headers });
      return response.data;
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
  async deleteTimers(deviceId: string, deleteData: TuyaDeleteTimersRequest): Promise<TuyaBaseResponse> {
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    const config = this.getTuyaConfig();
    const path = `/v1.0/cloud/energy/breaker/timer/device/${deviceId}/batch`;
    const body = JSON.stringify(deleteData);

    const headers = this.generateHeaders('DELETE', path, body, this.accessToken);

    try {
      const response = await this.httpClient.delete<TuyaBaseResponse>(path, { 
        headers,
        data: deleteData 
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to delete timers: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get current access token
   */
  getCurrentAccessToken(): string {
    return this.accessToken;
  }

  /**
   * Get current refresh token
   */
  getCurrentRefreshToken(): string {
    return this.refreshToken;
  }
}
