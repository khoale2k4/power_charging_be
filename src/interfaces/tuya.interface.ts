// Tuya API Response Interfaces
export interface TuyaBaseResponse {
  success: boolean;
  code?: string;
  msg?: string;
  result?: any;
}

export interface TuyaTokenResponse extends TuyaBaseResponse {
  result: {
    access_token: string;
    refresh_token: string;
    uid: string;
    expire_time: number;
  };
}

export interface TuyaAsset {
  asset_id: string;
  asset_name: string;
  asset_type: string;
  parent_asset_id?: string;
  time_zone_id: string;
  address_id?: string;
  address?: string;
  lon?: string;
  lat?: string;
  create_time: number;
  update_time: number;
  meta_id?: string;
  attrs?: any;
}

export interface TuyaAssetsResponse extends TuyaBaseResponse {
  result: {
    assets: TuyaAsset[];
    has_more: boolean;
    total: number;
  };
}

export interface TuyaDevice {
  device_id: string;
  device_name: string;
  device_type: string;
  category: string;
  sub: boolean;
  uuid: string;
  asset_id: string;
  local_key: string;
  model: string;
  node_id?: string;
  gateway_id?: string;
  ip: string;
  port: number;
  mac: string;
  version: string;
  online: boolean;
  create_time: number;
  update_time: number;
  active_time: number;
  time_zone_id: string;
  attrs?: any;
}

export interface TuyaDevicesResponse extends TuyaBaseResponse {
  result: {
    devices: TuyaDevice[];
    has_more: boolean;
    total: number;
  };
}

export interface TuyaDeviceCommand {
  code: string;
  value: any;
}

export interface TuyaDeviceStatus {
  code: string;
  value: any;
  time: number;
}

export interface TuyaDeviceStatusResponse extends TuyaBaseResponse {
  result: TuyaDeviceStatus[];
}

export interface TuyaStatisticsData {
  time: string;
  value: number;
}

export interface TuyaStatisticsResponse extends TuyaBaseResponse {
  result: {
    data: TuyaStatisticsData[];
    total: number;
  };
}

export interface TuyaTimer {
  timer_id: string;
  alias_name: string;
  category: string;
  time: string;
  timezone_id: string;
  date: string;
  loops: string;
  functions: TuyaDeviceCommand[];
  status: number;
  create_time: number;
  update_time: number;
}

export interface TuyaTimersResponse extends TuyaBaseResponse {
  result: {
    timers: TuyaTimer[];
    has_more: boolean;
    total: number;
  };
}

// Request Interfaces
export interface TuyaTimerRequest {
  user_id: string;
  alias_name: string;
  category: string;
  time: string;
  timezone_id: string;
  date: string;
  loops: string;
  functions: TuyaDeviceCommand[];
}

export interface TuyaDeleteTimersRequest {
  user_id: string;
  timer_ids: string;
}

// Configuration Interface
export interface TuyaConfig {
  baseUrl: string;
  clientId: string;
  secret: string;
  userId: string;
  code: string;
}
