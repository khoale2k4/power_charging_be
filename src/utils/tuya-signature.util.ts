import * as crypto from 'crypto';

export class TuyaSignatureUtil {
  /**
   * Generate signature for Tuya API requests
   * @param clientId - Tuya client ID
   * @param secret - Tuya secret key
   * @param accessToken - Access token (optional for token requests)
   * @param timestamp - Current timestamp
   * @param method - HTTP method
   * @param body - Request body (optional)
   * @param path - Request path with sorted query parameters
   * @returns HMAC-SHA256 signature in uppercase
   */
  static generateSignature(
    clientId: string,
    secret: string,
    accessToken: string = '',
    timestamp: string,
    method: string,
    body: string | null,
    path: string
  ): string {
    // Build string to be signed
    const str = 
//     `nenhvcwjfxmpdtqyhwnk797a6dfaf31c4cd10038dd07d45a05be1756036854748POST
// e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855

// /v1.0/cloud/energy/micro/device/command/bf8017f97b3f5a6f52a8ih?code=switch&user_id=beu1755919785468Ht4d&value=true`;
    this.buildStringToSign(
      clientId,
      accessToken,
      timestamp,
      method,
      body,
      path
    );
    console.log('buildStringToSign');
    console.log(str);

    // Generate HMAC-SHA256 signature
    const hash = crypto.createHmac('sha256', secret);

    hash.update(str);
    // hash.update(tem);
    const signature = hash.digest('hex').toUpperCase();

    return signature;
  }

  /**
   * Build string to be signed according to Tuya API specification
   */
  private static buildStringToSign(
    clientId: string,
    accessToken: string,
    timestamp: string,
    method: string,
    body: string | null,
    path: string
  ): string {
    // First line: client_id + access_token + t + Method
    const firstLine = clientId + accessToken + timestamp + method.toUpperCase();

    // Body SHA256
    const bodySha = body != null ? this.calculateBodySha256(body) : 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

    // Build the complete string
    return `${firstLine}\n${bodySha}\n\n${path}`;
  }

  /**
   * Calculate SHA256 hash of request body
   * @param body - Request body string
   * @returns SHA256 hash in hex format
   */
  private static calculateBodySha256(body: string): string {
    if (!body || body.trim() === '') {
      // Return fixed value for empty body
      return 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
    }

    const hash = crypto.createHash('sha256');
    hash.update(body.trim());
    return hash.digest('hex');
  }

  /**
   * Sort query parameters and build sorted URL path
   * @param path - Base path
   * @param queryParams - Query parameters object
   * @returns Sorted URL path with query parameters
   */
  static buildSortedUrl(path: string, queryParams: Record<string, string> = {}): string {
    if (Object.keys(queryParams).length === 0) {
      return path;
    }

    // Sort query parameters by key
    const sortedKeys = Object.keys(queryParams).sort();
    const sortedParams = sortedKeys.map(key => `${key}=${queryParams[key]}`);
    const queryString = sortedParams.join('&');

    return `${path}?${queryString}`;
  }

  /**
   * Get current timestamp in milliseconds
   * @returns Current timestamp as string
   */
  static getTimestamp(): string {
    return Date.now().toString();
  }
}
