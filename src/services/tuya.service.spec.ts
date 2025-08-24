import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { TuyaService } from './tuya.service';

describe('TuyaService', () => {
  let service: TuyaService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TuyaService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config = {
                'TUYA_BASE_URL': 'https://openapi.tuyaeu.com',
                'TUYA_CLIENT_ID': 'test_client_id',
                'TUYA_SECRET': 'test_secret',
                'TUYA_USER_ID': 'test_user_id',
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<TuyaService>(TuyaService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get configuration correctly', () => {
    const config = (service as any).getTuyaConfig();
    expect(config.baseUrl).toBe('https://openapi.tuyaeu.com');
    expect(config.clientId).toBe('test_client_id');
    expect(config.secret).toBe('test_secret');
    expect(config.userId).toBe('test_user_id');
  });

  it('should throw error when configuration is missing', () => {
    jest.spyOn(configService, 'get').mockReturnValue(undefined);
    
    expect(() => {
      (service as any).getTuyaConfig();
    }).toThrow('Missing required Tuya configuration. Please check your .env file.');
  });
});
